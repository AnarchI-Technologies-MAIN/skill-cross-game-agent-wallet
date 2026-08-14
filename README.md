# cross-game-agent-wallet

AnarchI Technologies (TM) CROSS game agent wallet role mapping and wrong-wallet prevention skill.

Hardcoding freedom into the systems of tomorrow.

## Purpose

Validates public wallet role maps and routes explicit intents to the correct wallet. It prevents agents from using owner, treasury, payout, or game wallets interchangeably unless the map explicitly says so.

## Use Cases

- Keep owner, agent, treasury, payout, and game-specific wallets distinct.
- Route paid-game entry to game.<slug>.premium when configured.
- Prevent owner wallets from accidental autonomous gameplay.
- Validate wallet maps before deployment.
- Provide public role context to dashboards and agents.

## Setup

~~~bash
git clone https://github.com/AnarchI-Technologies-MAIN/skill-cross-game-agent-wallet.git
cd skill-cross-game-agent-wallet
./install.sh
~~~

The installer symlinks skills/cross-game-agent-wallet into ~/.claude/skills/cross-game-agent-wallet and installs the package dependencies.

## Common Commands

~~~bash
cd skills/cross-game-agent-wallet
node scripts/template.mjs
node scripts/roles.mjs --file wallets.json
node scripts/validate.mjs --file wallets.json
node scripts/route.mjs --file wallets.json --intent=play-paid-game --game=claw-royale
node scripts/route.mjs --demo --intent=play-paid-game --game=claw-royale
~~~

## Configuration

- wallets.owner: human or owner-controlled public wallet.
- wallets.agent: autonomous agent public wallet.
- wallets.treasury: operational treasury wallet.
- wallets.payout: profit or withdrawal wallet.
- games.<slug>.agent: game-specific agent override.
- games.<slug>.premium: game-specific paid-entry wallet.

## Alternative Configurations

- Single-agent setup: define owner, agent, treasury, and payout only.
- Game-specific setup: add games.<slug>.agent and games.<slug>.premium per game.
- Multi-agent setup: maintain a role map per agent container.
- Dashboard mode: expose public role maps without mounting any secret vault.

## Validation

~~~bash
npm run check
npm run smoke:read
~~~

Run the skill validator after documentation or frontmatter changes:

~~~bash
python C:\Users\Administrator\.codex\skills\.system\skill-creator\scripts\quick_validate.py C:\Users\Administrator\Desktop\cross-skills\skill-cross-game-agent-wallet\skills\cross-game-agent-wallet
~~~

## Trademark Notice

AnarchI Technologies (TM) and the phrase "Hardcoding freedom into the systems of tomorrow" are used as source-identifying marks of AnarchI Technologies. This project is not an official to-nexus package unless and until the upstream team adopts it.

## License

Apache License 2.0. See LICENSE and NOTICE.md.
