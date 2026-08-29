# Published pricing governance — 29 August 2026

## Decision

`src/data/pricing.ts` is the single source of truth for the homepage table, the full prices page, price structured data, service-page price cards, generic service-page price answers and the five service registries' starting values.

The catalogue preserves the nine scopes already published consistently by the site. Work whose price depends on an unlisted combination, opening, part or diagnosis is labelled **quoted after inspection** rather than being assigned a new amount.

## Accuracy correction

The service-page redesign had introduced additional figures for complex lockouts, handle and alignment work, multi-opening boarding and bundled lock upgrades. Those figures were not present in the canonical production catalogue. They have therefore been removed from the service-page cards; the services remain described, but their amount is inspection-led.

This does not change the nine published starting prices. It prevents a service landing page or structured-data consumer from drifting away from `/prices`. Long-form editorial elsewhere on the site can quote the governed scopes for explanation, but it is not a competing price catalogue and remains subject to the normal source and rendered-page audits.

## Enforcement

`npm run audit:pricing` fails when:

- a published price ID or service label is duplicated;
- a price is missing its stated scope;
- a service page references an unknown catalogue row;
- quote-only wording embeds an amount;
- a service's advertised starting price differs from its independently assigned catalogue owner; or
- the homepage table, prices page or service page defines a competing local catalogue; or
- a generic or dedicated-town service registry embeds a literal monetary amount instead of deriving it from the canonical module.

Any future price change needs a deliberate update to the canonical catalogue and the normal source, build and rendered-SEO checks.
