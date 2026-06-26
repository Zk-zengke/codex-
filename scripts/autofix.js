const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MODEL = process.env.AI_AUTOFIX_MODEL || 'gpt-4.1-mini';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function getLastCommitMessage() {
  try {
    return execSync('git log -1 --pretty=%B').toString().trim();
  } catch (e) {
    return '';
  }
}

function extractAttempt(msg) {
  const match = msg.match(/AI autofix attempt (\d+)/);
  if (!match) return 0;
  return parseInt(match[1], 10);
}

function runCheck() {
  try {
    execSync('npm run check', { stdio: 'pipe' });
    return { ok: true, output: 'All checks passed' };
  } catch (err) {
    return { ok: false, output: (err.stdout?.toString() || '') + (err.stderr?.toString() || '') };
  }
}

async function callAI(errorLog, attempt) {
  if (!OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY');

  const prompt = `You are an automated code fixer (WeChat Mini Program).

Rules:
- Minimal changes only
- Do NOT delete features
- Return STRICT JSON only: {"files":[{"path":"","content":""}]}

Current attempt: ${attempt}/3

ERROR LOG:
${errorLog}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a senior debugging engine.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    })
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error('AI returned invalid JSON: ' + text);
  }
}

async function writeReport(attempt, result) {
  const dir = path.join('.autofix');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const report = `# Autofix Report\n\nAttempt: ${attempt}\n\nResult:\n\n\`\`\`\n${result}\n\`\`\`\n`;

  fs.writeFileSync(path.join(dir, 'report.md'), report);
}

async function main() {
  const msg = getLastCommitMessage();
  const attempt = extractAttempt(msg);

  if (attempt >= 3) {
    console.log('Max autofix attempts reached, skipping...');
    return;
  }

  const result = runCheck();

  if (result.ok) {
    console.log('No issues detected');
    return;
  }

  console.log(`Autofix attempt ${attempt + 1}/3`);

  const fix = await callAI(result.output, attempt + 1);

  if (!fix.files || !Array.isArray(fix.files)) {
    throw new Error('Invalid AI response');
  }

  for (const file of fix.files) {
    fs.mkdirSync(path.dirname(file.path), { recursive: true });
    fs.writeFileSync(file.path, file.content);
  }

  await writeReport(attempt + 1, result.output);

  console.log('Autofix v2 applied');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});