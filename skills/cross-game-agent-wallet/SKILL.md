---
name: cross-game-agent-wallet
description: CROSS game agent wallet role mapping and wrong-wallet prevention skill. Use when the user or an agent needs to map owner, agent, treasury, game, payout, vault, gas, or operator wallets; validate public addresses; choose the correct wallet for paid games, identity tokens, rewards, staking, Forge, or game-specific actions; or prevent CROSS agents from signing with the wrong wallet.
---

# cross-game-agent-wallet

Use this skill to validate wallet role maps and route intents to the correct public wallet.

## Rules

- Never store or print private keys.
- Treat owner and agent wallets as distinct unless the map explicitly says otherwise.
- Fail closed when a required wallet role is missing.
- Keep game-specific overrides explicit.

## Commands

```bash
node scripts/template.mjs
node scripts/roles.mjs --file wallets.json
node scripts/validate.mjs --file wallets.json
node scripts/route.mjs --file wallets.json --intent=play-paid-game --game=claw-royale
```

Use `--demo` for a built-in example.
