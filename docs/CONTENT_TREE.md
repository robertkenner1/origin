# Origin Toolkit - Content Tree
Last updated: January 16, 2026

## Legend
✅ Live  |  🚧 Placeholder  |  📋 Future/planned

---

## Tree View

```
Origin Toolkit
│
├── Home ✅
│   └── / (Landing page, future: Getting Started card)
│
├── Getting Started ✅
│   ├── Overview ✅
│   │   └── /getting-started (What's available, libraries, support links)
│   ├── Introduction to Origin 🚧
│   │   └── /getting-started/introduction (Glossary: Principles, Foundations, Tokens, etc.)
│   └── JavaScript ✅
│       └── /getting-started/javascript (Installation, setup, React components, tokens)
│
├── Components ✅
│   └── /components (Grid with filters + modal overlay for details)
│
├── Icons ✅
│   └── /icons (Grid with filters + copy interaction, 20px previews)
│
├── Brand ✅
│   ├── Illustrations ✅
│   │   └── /brand/illustrations (Spot, Empty, Success with filters)
│   ├── Logo 🚧
│   │   └── /brand/logo (Brand marks, lockups, usage guidelines)
│   ├── Typography 🚧
│   │   └── /brand/typography (Type scale, font families, pairing)
│   └── Color 🚧
│       └── /brand/color (Brand palette, accessibility, usage)
│
├── Tokens ✅
│   └── /tokens (Grid with filters + copy interaction, design tokens)
│
└── Contributing ✅
    ├── Overview ✅
    │   └── /contributing (How to add/update/propose components)
    ├── Styling Custom Components ✅
    │   └── /contributing/styling (GDS decision tree, creating custom components)
    └── Publishing Components ✅
        └── /contributing/publishing (Figma branching workflow, designer FAQ)
```

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
