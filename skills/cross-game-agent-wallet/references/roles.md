# Wallet roles

Recommended roles:

- `owner`: human or owner-controlled wallet.
- `agent`: wallet used by the autonomous game agent for signatures and gameplay.
- `treasury`: wallet holding operational funds and reserves.
- `payout`: wallet receiving profits or withdrawals.
- `gas`: optional gas reserve wallet.
- `game.<slug>.agent`: game-specific agent wallet override.
- `game.<slug>.premium`: game-specific paid-entry wallet override.

Default intent routing:

- `mint-identity`: `agent`
- `play-free-game`: `agent`
- `play-paid-game`: `game.<slug>.premium`, then `game.<slug>.agent`, then `agent`
- `claim-rewards`: `agent`
- `withdraw-profit`: `payout`, then `treasury`
- `stake-cross`: `treasury`
- `buy-agent-token`: `treasury`
