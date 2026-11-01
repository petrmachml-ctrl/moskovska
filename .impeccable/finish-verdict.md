## verdict

1. Resolved — “Mám záujem” now routes through #dopyt/:id and immediately reveals the unit-preselected demo form. The recaptured desktop-inquiry.png and mobile-inquiry.png visibly show B3.1, the focused name field, the non-sending explanation, all form controls and the sticky close button. The ID route retains its detail-only state. Current tests begin at the table CTA and assert validation, no transmission/storage/cookies, and focus returned to that CTA on close; the reported passing results corroborate the code and captures.

Regressions introduced by this fix: none observed. All ten original capture paths were re-read and remain valid. The additional completion captures retain the explicit statement that nothing was sent or stored.

## remaining

Clear. This ship verdict covers the scored inquiry-entry fix.

disposition: ship
