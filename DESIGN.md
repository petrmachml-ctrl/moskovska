---
name: Dom BALCON — Mestská architektúra
description: Visual system for the user-approved variant A public preview.
colors:
  paper: "#fafaf7"
  white: "#fff"
  chalk: "#e5e3dd"
  ink: "#252c30"
  petrol: "#264f56"
  petrol-dark: "#183e45"
  steel: "#9aadb0"
  muted: "#526269"
  line: "#cdd2d0"
  soft: "#f0f2ee"
  free-bg: "#e6efe7"
  free-ink: "#315e40"
  reserved-bg: "#eee9df"
  reserved-ink: "#64533b"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 4.6vw, 4.2rem)"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(1.85rem, 3vw, 2.65rem)"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 650
    lineHeight: 1.65
  button:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 650
    lineHeight: 1.5
rounded:
  control: "4px"
  image-label: "3px"
  photo-caption: "2px"
  dialog: "10px"
spacing:
  px-4: "4px"
  px-8: "8px"
  px-12: "12px"
  px-16: "16px"
  px-20: "20px"
  px-24: "24px"
  px-28: "28px"
  px-32: "32px"
  px-36: "36px"
  px-48: "48px"
  px-72: "72px"
components:
  button-primary:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 25px"
  button-primary-hover:
    backgroundColor: "{colors.petrol-dark}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.petrol}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 25px"
  button-secondary-hover:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.white}"
---

# Design System: Dom BALCON

## Overview

**Creative North Star: "Mestská architektúra"**

The user-approved variant A is quiet, photographic and architectural. Paper-colored space, graphite type and deep petrol actions support large exterior and interior illustrations. The visual character comes from aligned edges, compact headings, restrained controls and generous image regions.

This document captures the existing semantic implementation of the approved composition. Dom BALCON remains a working name and this site remains a public preview. The prominent Náhled label, visible illustration captions and synthetic-data notices are part of the visual hierarchy. The homepage composition and reading order remain in [the surface brief](.impeccable/surfaces/home.md); this system records the reusable visual choices.

**Key Characteristics:**

- Self-hosted Manrope throughout, with heavy compact headings and legible body copy.
- Paper and graphite foundations, petrol actions and neutral photographic material.
- Straight alignments, thin rules and modest rectangular controls.
- Visible preview, illustration and demonstration-data labels.
- Responsive offer rows and native dialogs with a reachable sticky toolbar.

## Colors

The palette stays near neutral so architectural and interior images carry the material character. Frontmatter values mirror the CSS custom properties; descriptive names below explain their use.

### Primary

- **Deep petrol** (`petrol`): primary actions, links, focus outlines, preview badge and selection background.
- **Dark petrol** (`petrol-dark`): primary-action hover state.

### Neutral

- **Paper** (`paper`): page ground, select fields, modal surfaces and sticky toolbars.
- **White** (`white`): primary-action text and form input surfaces.
- **Chalk** (`chalk`): contact band, image loading background and icon-button hover.
- **Graphite** (`ink`): headings, body text and the lightbox image background.
- **Muted blue-grey** (`muted`): supporting copy, field labels, table headings and captions.
- **Steel** (`steel`): input borders, table-header rule, demonstration badge border and scrollbar thumb.
- **Thin neutral rule** (`line`): section dividers, offer rows, field borders and dialog separators.
- **Soft neutral** (`soft`): preview/project bands, offer-row hover and demo completion surface.

### Semantic status colors

- **Available** (`free-bg`, `free-ink`): pale green background and dark green text for the synthetic “Voľné” status.
- **Reserved** (`reserved-bg`, `reserved-ink`): pale sand background and brown text for the synthetic “Rezervované” status.

These status pairs describe demonstration records, not actual availability. They remain accompanied by written labels and the offer’s fiction notice.

**The Visible Truth Rule.** Keep preview, illustration and synthetic-data notices visible alongside the content they qualify.

## Typography

**Display and Body Font:** Manrope, with Arial and sans-serif fallbacks. Both Latin and Latin Extended variable WOFF2 subsets are served locally from `assets/fonts/`, covering normal weights (200–800), with `font-display: swap` and font synthesis disabled.

**Character:** One sans-serif family connects expressive headings with practical offer data. Headings use tight spacing and balanced wrapping; prose and fields keep a relaxed reading rhythm. No separate decorative or monospace family is implemented.

### Hierarchy

- **Display:** the frontmatter display role is the default desktop hero heading. At the medium breakpoint it becomes `clamp(2.6rem, 5vw, 3.7rem)`; at the compact breakpoint it becomes `clamp(2.45rem, 7.6vw, 3.9rem)`.
- **Headline:** the frontmatter headline role supplies general section headings. Project, location, contact and modal headings have local sizes recorded in the source, rather than a separate universal scale.
- **Title:** the frontmatter title role supplies empty-state and inquiry subheadings.
- **Body:** the frontmatter body role supplies the document baseline. Paragraphs are capped at a readable measure (70ch); smaller supporting copy varies by context.
- **Label:** the frontmatter label role describes the bordered demonstration badge. Form/filter labels remain visible above their fields. They use sentence case, as do buttons and navigation.
- **Button:** the frontmatter button role supplies the shared action text. Detail actions reduce the size (0.86rem), and the mobile hero action uses a local size (0.88rem).
- **Offer data:** the desktop table uses tabular numerals (0.86rem baseline); unit IDs are emphasized (800 weight). Interior and exterior areas remain separately named.

## Layout

The default centered container has a maximum width (1240px) with total side allowance (96px). Standard sections use vertical padding (72px). Spacing is contextual rather than a strict mathematical scale; the frontmatter records recurring implemented steps.

The desktop hero places copy to the left over a paper wash and lets the architectural image dominate the right. Its minimum height is established (575px); the copy occupies a bounded region (55%, maximum 650px). Facts use three aligned columns. The gallery and project information use two columns, with thin rules rather than a deck of cards. The table maintains aligned unit, type, floor, interior, exterior, status and action columns.

Responsive behavior follows the implemented media queries:

- **At or below 1100px:** the container uses total side allowance (56px), hero copy and type adjust, the table becomes denser and project columns reduce their gap.
- **At or below 760px:** the container uses total side allowance (40px); the header exposes a labelled Menu control and collapsible navigation. Hero copy and action precede an unobscured exterior image. Offer rows become two-column grids with visible floor/interior/exterior labels. Gallery, project, contact, footer, area lists, action groups and form fields stack as needed. Section padding reduces (48px). Dialogs use narrower outer gutters (24px total) and a larger permitted viewport height (94dvh).
- **At or above 1600px:** the hero image starts farther right (30%) and its legibility wash changes to preserve the composition.

Keep desktop and mobile reading order semantic. Mobile offer labels come from the existing `data-label` attributes, while the table retains row/column semantics in its markup.

## Elevation & Depth

The page is predominantly flat. Neutral bands, photographic material, one-pixel rules and the hero’s paper wash separate regions. The wash is an image-legibility treatment, not a gradient branding device. Shadows are reserved for overlaid navigation and native dialogs.

### Shadow Vocabulary

- **Dialog:** `0 20px 80px rgba(15,28,31,.26)` distinguishes the modal from the page. Its backdrop uses `rgba(17,30,34,.68)`.
- **Mobile navigation:** `0 10px 16px rgba(24,45,49,.08)` gives the expanded menu a small overlay edge.

Interactive motion stays restrained: button colors transition, offer rows change background, and gallery images enlarge slightly on hover. The reduced-motion query disables transitions/animations and restores automatic scrolling. Exact motion definitions live in the sidecar.

## Shapes

Controls, status chips, preview badges and completion surfaces share the modest control radius from frontmatter. Image labels and dark caption plates use the smaller documented radii. Photographic regions themselves remain rectangular. Dialogs use the larger dialog radius; this does not introduce rounded marketing cards elsewhere.

Thin solid borders define field edges, offer rows and dividers. Icons use consistent unfilled SVG strokes (1.6 width), round line caps and round joins. Arrow, close, menu and enlargement symbols stay functional and inherit surrounding text color.

## Components

### Buttons

Restrained rectangular actions combine clear labels with generous touch space. The primary and secondary component tokens reference the shared palette, typography and shape. Shared buttons have a minimum height (50px), an optional arrow (22px) and a text/icon gap (32px). The secondary action has a petrol outline and fills on hover. Global disabled buttons reduce opacity (0.55) and use the unavailable cursor.

All interactive controls use a visible petrol focus outline (3px), offset from the edge (4px). Keep link navigation as anchors and local actions as buttons. The skip link becomes visible on focus.

### Inputs / Fields

Filters use native selects with persistent labels, paper backgrounds, neutral rules and the shared control shape. Inquiry inputs and textarea use white backgrounds, steel borders, internal padding (11px 12px) and a minimum field height (44px). The textarea is vertically resizable, with an initial minimum height (105px). The inquiry form has a two-column grid that stacks at the compact breakpoint.

Validation uses native required/email constraints and `reportValidity()`. No custom error-color system is defined. The inquiry notice says to use invented data, and completion explicitly says nothing was sent or stored. Keep the readonly manual-copy fallback visibly labelled when clipboard access fails.

### Navigation

The desktop wordmark and four text links share a single aligned header. Links use a simple petrol underline on hover. At the compact breakpoint, Menu exposes the links below the header, with `aria-expanded` and `aria-controls`. Selecting a link closes the menu; Escape closes it and restores focus to the menu button. No selected-navigation treatment is implemented.

### Offer / Status

The offer is a ruled semantic table that becomes labelled rows on compact screens. Unit IDs open `#jednotka/:id` detail routes. “Mám záujem” opens `#dopyt/:id`, immediately reveals the unit-preselected demo form and focuses the first field. Status chips retain text as well as color. Filters update a polite live result count; a zero-result state offers a reset that returns focus to the type filter.

Separate interior, balcony, terrace and storage information remains explicit. Any representative unit shown in the sidecar is copied from the synthetic dataset and labelled as demonstration content.

### Dialogs / Gallery

Unit detail and image enlargement use native `<dialog>` elements and `showModal()`. Their toolbar remains sticky at the top, on the paper ground, with a visible close button. Unit detail supports Escape and outside-click dismissal; closing the unit detail returns focus to the originating offer action. The desktop unit dialog is bounded (760px wide, 90dvh maximum); the image dialog has its own wider bound (1120px).

Gallery triggers are semantic buttons containing local raster illustrations with descriptive alternative text, visible Ilustrácia labels and captions. They expose an enlargement icon and a gentle image scale on hover. The enlarged image preserves its aspect and explicit fiction context. Keep imagery and fonts local; do not replace illustrated photography with decorative CSS or remove notices.

## Do's and Don'ts

### Do:

- **Do** preserve the approved paper, graphite and petrol world and self-hosted Manrope.
- **Do** keep preview, illustration and synthetic-data labels readable in every responsive composition.
- **Do** use thin rules, aligned rows and written area/status labels to organize the offer.
- **Do** preserve visible field labels, focus outlines, keyboard dismissal and the sticky dialog close control.
- **Do** honor reduced motion and the implemented compact, medium and wide breakpoints.

### Don't:

- **Don't** turn synthetic units or status chips into claims of actual availability.
- **Don't** imply that a demo inquiry was sent or stored, or invent real contact details or floor plans.
- **Don't** relabel administrative premises or the attic apartment as flats, or merge interior and exterior areas.
- **Don't** add decorative motion, ornate typography or a new card system to this quiet approved world.
- **Don't** replace local semantic imagery with a rasterized page or remove its illustration notices.
