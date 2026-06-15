import { readFileSync } from 'node:fs';
import { fail } from './_json.mjs';

export const demoMap = {
  version: 1,
  wallets: {
    owner: '0x0000000000000000000000000000000000000001',
    agent: '0x0000000000000000000000000000000000000002',
    treasury: '0x0000000000000000000000000000000000000003',
    payout: '0x0000000000000000000000000000000000000004',
  },
  games: {
    'claw-royale': {
      agent: '0x0000000000000000000000000000000000000002',
      premium: '0x0000000000000000000000000000000000000002',
    },
  },
};

export function parseArgs(argv) {
  const opts = {};
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const [k, v = 'true'] = arg.slice(2).split('=');
      opts[k] = v;
    }
  }
  return opts;
}

export function loadMap(opts) {
  if (opts.demo === 'true' || opts.demo === true) return demoMap;
  if (!opts.file) fail('--file <wallets.json> is required unless --demo is used');
  return JSON.parse(readFileSync(opts.file, 'utf8'));
}

export function isAddress(value) {
  return /^0x[0-9a-fA-F]{40}$/.test(String(value || ''));
}

export function flattenRoles(map) {
  const rows = [];
  for (const [role, address] of Object.entries(map.wallets || {})) rows.push({ role, address });
  for (const [game, roles] of Object.entries(map.games || {})) {
    for (const [role, address] of Object.entries(roles || {})) rows.push({ role: `game.${game}.${role}`, address });
  }
  return rows;
}

export function validateMap(map) {
  const rows = flattenRoles(map);
  const invalid = rows.filter((r) => !isAddress(r.address));
  const required = ['owner', 'agent'];
  const missing = required.filter((role) => !map.wallets?.[role]);
  const warnings = [];
  if (map.wallets?.owner && map.wallets?.agent && map.wallets.owner.toLowerCase() === map.wallets.agent.toLowerCase()) {
    warnings.push('owner and agent wallets are the same address');
  }
  return {
    ok: invalid.length === 0 && missing.length === 0,
    rows,
    invalid,
    missing,
    warnings,
  };
}

export function routeIntent(map, intent, game = null) {
  const g = game ? map.games?.[game] || {} : {};
  const routes = {
    'mint-identity': ['agent'],
    'play-free-game': [`game.${game}.agent`, 'agent'],
    'play-paid-game': [`game.${game}.premium`, `game.${game}.agent`, 'agent'],
    'claim-rewards': [`game.${game}.agent`, 'agent'],
    'withdraw-profit': ['payout', 'treasury'],
    'stake-cross': ['treasury'],
    'buy-agent-token': ['treasury'],
  };
  const candidates = routes[intent] || [intent];
  for (const role of candidates) {
    if (role.startsWith('game.') && game) {
      const part = role.split('.').at(-1);
      if (g[part]) return { role, address: g[part], candidates };
    }
    if (map.wallets?.[role]) return { role, address: map.wallets[role], candidates };
  }
  return { role: null, address: null, candidates };
}
