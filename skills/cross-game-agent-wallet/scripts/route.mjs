#!/usr/bin/env node
import { fail, handleMain, out } from './_json.mjs';
import { isAddress, loadMap, parseArgs, routeIntent, validateMap } from './_wallets.mjs';

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const map = loadMap(opts);
  const intent = opts.intent;
  if (!intent) fail('--intent is required');
  const validation = validateMap(map);
  const routed = routeIntent(map, intent, opts.game || null);
  const blocked = [];
  if (!validation.ok) blocked.push('wallet map validation failed');
  if (!routed.address) blocked.push(`no wallet route for intent ${intent}`);
  if (routed.address && !isAddress(routed.address)) blocked.push(`routed address is invalid for ${routed.role}`);
  out({
    ok: blocked.length === 0,
    skill: 'cross-game-agent-wallet',
    command: 'route',
    intent,
    game: opts.game || null,
    routed,
    blocked,
    warnings: validation.warnings,
  });
}

handleMain(main());
