#!/usr/bin/env node
import { handleMain, out } from './_json.mjs';
import { loadMap, parseArgs, validateMap } from './_wallets.mjs';

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const verdict = validateMap(loadMap(opts));
  out({ skill: 'cross-game-agent-wallet', command: 'validate', ...verdict });
}

handleMain(main());
