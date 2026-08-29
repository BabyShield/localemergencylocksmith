# Semrush small-town service routing — 29 August 2026

## Evidence boundary

- Source: the authenticated Semrush Bulk Analysis interface in the existing Microsoft Edge session, using the United Kingdom database.
- The submitted batch contained 18 exact keyword strings: six locksmith intent variants for each of Southam, Studley and Alcester. The variants covered the broad locksmith, emergency locksmith, lock-change, uPVC-lock-repair, boarding-up and anti-snap-lock intents.
- Semrush returned metrics for four rows. Those raw rows are preserved unchanged in `2026-08-29-southam-studley-alcester-service-batch-uk.csv`.
- The session preserved the exact text of the four returned rows, but not the individual spelling and word order of the 14 blank inputs. Those 14 submitted strings were absent from the completed results, so they are unavailable or unreported rather than measured zeroes. Reproducing their exact text from the intent labels would be guesswork; a future rerun should preserve the input list before submission.
- Volumes are Semrush estimates for exact UK keyword strings. They are not local enquiry totals, live rankings, conversions or a guarantee of future performance.

## Measured results

| Exact keyword | UK volume |
| --- | ---: |
| locksmith southam | 30 |
| locksmith alcester | 20 |
| locksmith studley | 20 |
| emergency locksmith southam | 0 |

## Canonical routing decision

The three positive broad-town results reinforce the existing substantial area hubs at `/areas/southam`, `/areas/alcester` and `/areas/studley`. The explicit zero for one emergency variant and the absence of reported metrics for the other 14 variants do not support creating fifteen additional standalone service-area pages.

The governed architecture is therefore unchanged: every town hub contains five distinct, source-reviewed service sections; the seven existing towns with separately authored service pages retain them; and all other service-area routes continue to resolve to the matching canonical section on the town hub. This avoids manufacturing near-duplicate or doorway pages from unavailable demand data.
