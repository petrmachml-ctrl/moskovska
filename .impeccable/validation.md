# Validation before publication

The static production build completed successfully with `npm run build` under Node 24.19.0. All 14 Playwright checks passed against the production output on desktop (1440 × 1000) and mobile (390 × 844). Additional narrow-width checks covered 320, 390, 768, 1024 and 1440 pixels with no horizontal overflow.

The suite exercised eight unit routes, combined type/status filters including empty/reset, direct unit-preselected inquiry entry, invalid and valid demo form cases, no outgoing submission or browser storage/cookies, gallery enlargement, keyboard dismissal, mobile menu and automated axe WCAG A/AA checks. Two focused inquiry tests also passed after adding the return-focus assertion. These automated checks do not establish complete manual accessibility or legal compliance.

The first asset assertion accidentally counted the intentionally empty lightbox image before it had a source; the selector was corrected to verify actual sourced images, while the gallery test separately checks the populated lightbox. Final results are passes, not ignored failures.

Independent finish review requested one material interaction fix: the table interest action must directly reveal and focus the selected unit's form. This was applied and rescored `resolved`; the verdict is `ship` for that scored fix, with no introduced regression observed. See finish-review.md and finish-verdict.md. No formal EGM convergence or automated Impeccable phase/diff/detector run is claimed; its executable is unavailable.

Illustrations and unit records remain explicitly fictional. The form is a non-sending demonstration. Real contacts, plans and CMS are not part of this public preview.
