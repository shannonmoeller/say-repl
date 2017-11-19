const chalk = require('chalk');
const {spawn} = require('child_process');
const {createInterface} = require('readline');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function render(name, color) {
  try {
    return color in chalk ? chalk[color](name) : chalk.keyword(color)(name);
  } catch (e) {
    return name;
  }
}

function answer(name, color, line) {
  const [cmd, value] = line.split(' ');

  switch (cmd) {
    case '/name':
      name = value;
      break;

    case '/color':
      color = value;
      break;

    case '/exit':
      process.exit();
      return;

    default:
      spawn('say', ['-v', name, line]);
      break;
  }

  ask(name, color);
}

function ask(name = 'Samantha', color = 'blue') {
  const prompt = `${render(name, color)}❯ `;

  rl.question(prompt, line => answer(name, color, line));
}

module.exports = ask;
