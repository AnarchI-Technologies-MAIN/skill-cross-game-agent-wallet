#!/usr/bin/env node
import { out } from './_json.mjs';
import { demoMap } from './_wallets.mjs';

out({
  ok: true,
  skill: 'cross-game-agent-wallet',
  command: 'template',
  template: demoMap,
});
