const { execSync } = require('child_process');
const fs = require('fs');

const MODEL = process.env.AI_AUTOFIX_MODEL || 'gpt-4.1-mini';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function runCheck() {
  try {
    execSync('npm run check', { stdio: 'pipe' });
    return { ok: true, output: 'All checks passed' };
  } catch (err) {
    return { ok: false, output: err.stdout?.toString() + err.stderr?.toString() };
  }
}

async function callAI(errorLog) {
  if (!OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const prompt = `You are an automated code fixer.
Repository: WeChat Mini Program.
Task: Fix the following errors with minimal changes.
Return JSON ONLY in format: {"files":[{"path":"","content":""}]}.

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
        { role: 'system', content: 'You are a senior debugging assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    })
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  return JSON.parse(text);
}

async function main() {
  const result = runCheck();

  if (result.ok) {
    console.log('No issues detected');
    process.exit(0);
  }

  console.log('Errors detected, calling AI autofix...');

  const fix = await callAI(result.output);

  if (!fix.files) {
    throw new Error('Invalid AI response');
  }

  for (const file of fix.files) {
    fs.mkdirSync(require('path').dirname(file.path), { recursive: true });
    fs.writeFileSync(file.path, file.content);
    console.log('Fixed:', file.path);
  }

  console.log('Autofix applied');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});