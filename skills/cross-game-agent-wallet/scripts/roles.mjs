#!/usr/bin/env node
import { handleMain, out } from './_json.mjs';
import { flattenRoles, loadMap, parseArgs } from './_wallets.mjs';

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const map = loadMap(opts);
  out({ ok: true, skill: 'cross-game-agent-wallet', command: 'roles', roles: flattenRoles(map) });
}

handleMain(main());
