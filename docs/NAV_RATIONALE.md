# Navigation Rationale

This document explains the reasoning behind the current global navigation structure. It is updated as requirements evolve.

---

## Current Navigation

```
[Logo → ORIGIN]   Home | Getting Started | Components | Icons | Brand | Tokens | Contributing   [Support]
```

### Expandable Sections

- **Getting Started**: Overview, Introduction to Origin, JavaScript
- **Brand**: Illustrations, Logo, Typography, Color
- **Contributing**: Overview, Styling Custom Components, Publishing Components

---

## Decision Log

### January 13, 2026 — Documentation & Contribution Migration

#### Getting Started Section Added

**Structure:**
| Sub-page | Path | Content |
|----------|------|---------|
| Overview | `/getting-started` | What's available, libraries overview, support links |
| Introduction to Origin | `/getting-started/introduction` | Glossary of key terms (Principles, Foundations, Tokens, Components, Patterns, Templates, Partners) |
| JavaScript | `/getting-started/javascript` | Installation, setup, usage documentation for the JavaScript library |

**Rationale:**
- Consolidated engineers and designers onboarding content into a single section
- Removed redundant "Designers" page (Figma instructions out of date)
- Excluded language-specific pages (C#, Swift) — low adoption
- Provides clear entry point for new users
- Houses library documentation in a logical, discoverable location

#### Contributing Section Added

**Structure:**
| Sub-page | Path | Content |
|----------|------|---------|
| Overview | `/contributing` | How to add components, update components, propose designs, and guidelines overview |
| Styling Custom Components | `/contributing/styling` | Guide for creating custom components with GDS when system components don't fit |
| Publishing Components | `/contributing/publishing` | Figma branching workflow for designers to add components to the Origin Toolkit |

**Rationale:**
- Separated contribution content from general documentation
- Excluded low-value pages per design guidance:
  - Component Conventions (moved to in-repo documentation)
  - Component Page Template (enforced via Sanity CMS)
  - Writing Conventions (low viewership, better as linter rules)
- Focuses on the most common contribution workflows
- Provides designers and engineers with clear, actionable guidance

#### Home Tab Re-added

**Rationale:**
- Dedicated space for future "Getting Started" card/content
- Provides a clear landing page for first-time visitors
- Logo still serves as home link, but explicit tab improves discoverability

---

### January 8, 2026 — Initial Structure

#### Analytics-Driven Decisions

Based on Google Analytics page view data:

| Page | Views | % of Total | Decision |
|------|-------|------------|----------|
| Home | 227K | 58.68% | Re-added as dedicated tab for onboarding content |
| Components | 190K | 16.78% | **Keep** — Core content, high traffic |
| Iconography | 134K | 26.17% | **Keep** — High traffic, heavily used in UI |
| Tokens | 182K | 10.13% | **Keep** — Includes Colors (580K views) |
| Illustrations | 67K | 2.88% | **Moved under Brand** — Lower traffic, better grouped with brand assets |
| Patterns | — | Not in top results | **Removed** — Low traffic, not a priority |

#### Team Requirements

- **Brand tab added**: Team requested a dedicated space for brand assets
- **Illustrations nested under Brand**: Logical grouping with other identity assets (Logo, Typography)
- **Home tab initially removed**: Logo served as home link, freeing up nav space (later re-added)

#### Brand Tab Structure

The Brand tab is a **hub page** with category cards linking to dedicated sub-pages:

| Sub-page | Path | Content |
|----------|------|---------|
| Illustrations | `/brand/illustrations` | Spot, Empty, Success illustrations with filters |
| Logo | `/brand/logo` | Brand marks, lockups, usage guidelines |
| Typography | `/brand/typography` | Type scale, font families, pairing guidelines |
| Color | `/brand/color` | Brand palette, accessibility, usage guidelines |

**Why sub-pages instead of one scrollable page?**
- Each section will have extensive design guidance (do's & don'ts, specifications)
- Dedicated pages allow section-specific search/filters
- Better deep-linking for sharing specific assets
- Cleaner analytics per content type
- Matches the architecture of Components/Icons/Tokens

---

## Principles

1. **Data-informed**: Use analytics to prioritize high-traffic sections
2. **Logical grouping**: Related assets should be grouped together (e.g., Brand assets, Getting Started docs, Contributing guides)
3. **Progressive disclosure**: Nest lower-traffic items under parent categories with secondary navigation
4. **Clear separation**: Documentation (Getting Started) and contribution workflows (Contributing) live in dedicated sections
5. **Discoverability**: Key sections like onboarding and contribution are top-level for easy access

---

## Architecture Patterns

### Hub Pages with Secondary Navigation
Sections with multiple related pages use a **sidebar navigation pattern**:
- Getting Started (3 pages)
- Brand (4 pages)  
- Contributing (3 pages)

This provides:
- Consistent navigation within a section
- Easy page-to-page movement
- Clear context of where you are in the system
- Scalability for future content additions

### Single Pages
High-traffic, standalone sections remain as single pages:
- Components (with modal overlay for details)
- Icons (with filtering)
- Tokens (with filtering)

---

## Future Considerations

- [x] ~~Add "Getting Started" if onboarding traffic increases~~ ✅ **Added January 13, 2026**
- [x] ~~Add "Contributing" section for contribution workflows~~ ✅ **Added January 13, 2026**
- [ ] Monitor Getting Started analytics to validate content strategy
- [ ] Consider adding "Patterns" back if usage increases
- [ ] Voice & Tone content may be added under Brand
- [ ] Evaluate need for "Resources" mega-section if documentation grows

---

*Last updated: January 13, 2026*

