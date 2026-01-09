# Navigation Rationale

This document explains the reasoning behind the current global navigation structure. It is updated as requirements evolve.

---

## Current Navigation

```
[Logo → Home]   Components | Icons | Brand | Tokens   [Support]
```

---

## Decision Log

### January 8, 2026 — Initial Structure

#### Analytics-Driven Decisions

Based on Google Analytics page view data:

| Page | Views | % of Total | Decision |
|------|-------|------------|----------|
| Home | 227K | 58.68% | Accessible via logo click (no dedicated tab needed) |
| Components | 190K | 16.78% | **Keep** — Core content, high traffic |
| Iconography | 134K | 26.17% | **Keep** — High traffic, heavily used in UI |
| Tokens | 182K | 10.13% | **Keep** — Includes Colors (580K views) |
| Illustrations | 67K | 2.88% | **Moved under Brand** — Lower traffic, better grouped with brand assets |
| Patterns | — | Not in top results | **Removed** — Low traffic, not a priority |

#### Team Requirements

- **Brand tab added**: Team requested a dedicated space for brand assets
- **Illustrations nested under Brand**: Logical grouping with other identity assets (Logo, Typography)
- **Home tab removed**: Logo serves as home link, freeing up nav space

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
2. **Logical grouping**: Related assets should be grouped together
3. **Minimal tabs**: Fewer top-level items = easier navigation
4. **Progressive disclosure**: Nest lower-traffic items under parent categories

---

## Future Considerations

- [ ] Add "Getting Started" if onboarding traffic increases
- [ ] Consider "Assets" mega-menu if Brand grows too large
- [ ] Monitor Patterns traffic — re-add if usage increases
- [ ] Voice & Tone content may be added under Brand

---

*Last updated: January 8, 2026*

