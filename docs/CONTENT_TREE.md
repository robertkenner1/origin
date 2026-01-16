# Origin Toolkit - Content Tree
Last updated: January 16, 2026

## Legend
🟦 Top-level navigation tab
🟨 Sub-page with secondary nav
✅ Live
🚧 Placeholder content
📋 Future/planned

---

## Structure

### 🟦 HOME
Path: /
Status: ✅ Live
Type: Landing page
Content: Empty (future: Getting Started card)

---

### 🟦 GETTING STARTED
Path: /getting-started
Status: ✅ Live
Type: Hub page with sidebar nav
Sub-pages: 3

  🟨 Overview
  Path: /getting-started
  Status: ✅ Live
  Content: What's available, libraries, support links
  
  🟨 Introduction to Origin
  Path: /getting-started/introduction
  Status: 🚧 Placeholder
  Content: Glossary (Principles, Foundations, Tokens, Components, Patterns, Templates, Partners)
  
  🟨 JavaScript
  Path: /getting-started/javascript
  Status: ✅ Live
  Content: Installation, setup, usage (React components, tokens, CSS variables)

---

### 🟦 COMPONENTS
Path: /components
Status: ✅ Live
Type: Grid with filters + modal overlay
Content: Component cards that open detail modal with Design/Accessibility/Content tabs

---

### 🟦 ICONS
Path: /icons
Status: ✅ Live
Type: Grid with filters + copy interaction
Content: 20px icon previews, copyable code, search

---

### 🟦 BRAND
Path: /brand
Status: ✅ Live
Type: Hub page with category cards
Sub-pages: 4

  🟨 Illustrations
  Path: /brand/illustrations
  Status: ✅ Live
  Content: Spot, Empty, Success illustrations with filters
  
  🟨 Logo
  Path: /brand/logo
  Status: 🚧 Placeholder
  Content: Brand marks, lockups, usage guidelines
  
  🟨 Typography
  Path: /brand/typography
  Status: 🚧 Placeholder
  Content: Type scale, font families, pairing guidelines
  
  🟨 Color
  Path: /brand/color
  Status: 🚧 Placeholder
  Content: Brand palette, accessibility, usage guidelines

---

### 🟦 TOKENS
Path: /tokens
Status: ✅ Live
Type: Grid with filters + copy interaction
Content: Design tokens (colors, spacing, typography) with copyable code

---

### 🟦 CONTRIBUTING
Path: /contributing
Status: ✅ Live
Type: Hub page with sidebar nav
Sub-pages: 3

  🟨 Overview
  Path: /contributing
  Status: ✅ Live
  Content: How to add/update/propose components, guidelines overview
  
  🟨 Styling Custom Components
  Path: /contributing/styling
  Status: ✅ Live
  Content: GDS decision tree, creating custom components when system doesn't fit
  
  🟨 Publishing Components
  Path: /contributing/publishing
  Status: ✅ Live
  Content: Figma branching workflow, FAQ for designers

---

## Excluded Content (removed during migration)
- Designers page (outdated Figma instructions)
- Engineers page (language-specific content)
- Component Conventions (moved to in-repo docs)
- Component Page Template (enforced via Sanity CMS)
- Writing Conventions (low viewership, better as linter rules)
- C#, Swift library docs (low adoption)

---

## Notes
- All "copyable" pages (Icons, Tokens, Illustrations) use consistent TokenCard component
- Component detail modals use neutral-0 background
- Getting Started and Contributing use secondary sidebar navigation
- Brand is a hub page with category cards (not sidebar nav)
