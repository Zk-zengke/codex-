const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const ignoreDirs = new Set(['.git', 'node_modules', 'miniprogram_npm']);

const requiredFiles = [
  'app.js',
  'app.json',
  'app.wxss',
  'project.config.json',
  'sitemap.json',
  'pages/index/index.js',
  'pages/index/index.json',
  'pages/index/index.wxml',
  'pages/index/index.wxss',
  'pages/foods/foods.js',
  'pages/foods/foods.json',
  'pages/foods/foods.wxml',
  'pages/foods/foods.wxss',
  'pages/shopping/shopping.js',
  'pages/shopping/shopping.json',
  'pages/shopping/shopping.wxml',
  'pages/shopping/shopping.wxss',
  'pages/mine/mine.js',
  'pages/mine/mine.json',
  'pages/mine/mine.wxml',
  'pages/mine/mine.wxss',
  'utils/storage.js'
];

function walk(dir, result = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, result);
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

function assertRequiredFiles() {
  const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(rootDir, file)));

  if (missing.length > 0) {
    throw new Error(`Missing required files:\n${missing.join('\n')}`);
  }
}

function validateJsonFiles(files) {
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  for (const file of jsonFiles) {
    const relativePath = path.relative(rootDir, file);
    try {
      JSON.parse(fs.readFileSync(file, 'utf8'));
      console.log(`JSON OK: ${relativePath}`);
    } catch (error) {
      throw new Error(`Invalid JSON in ${relativePath}: ${error.message}`);
    }
  }
}

function validateJsSyntax(files) {
  const jsFiles = files.filter((file) => file.endsWith('.js'));

  for (const file of jsFiles) {
    const relativePath = path.relative(rootDir, file);
    childProcess.execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    console.log(`JS OK: ${relativePath}`);
  }
}

function main() {
  console.log('Checking native WeChat Mini Program project...');
  assertRequiredFiles();
  const files = walk(rootDir);
  validateJsonFiles(files);
  validateJsSyntax(files);
  console.log('All checks passed.');
}

main();
