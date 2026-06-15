# cross-game-agent-wallet

CROSS game agent wallet role mapping and wrong-wallet prevention skill.

Use it to keep owner, agent, game, treasury, and payout wallets clearly separated across CROSS games.

## Commands

```bash
node skills/cross-game-agent-wallet/scripts/template.mjs
node skills/cross-game-agent-wallet/scripts/roles.mjs --file wallets.example.json
node skills/cross-game-agent-wallet/scripts/route.mjs --file wallets.example.json --intent=play-paid-game --game=claw-royale
node skills/cross-game-agent-wallet/scripts/validate.mjs --file wallets.example.json
```

Only public addresses are handled.
