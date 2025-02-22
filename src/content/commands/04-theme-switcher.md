---
title: "Theme Switcher"
summary: "Adding a theme switcher component with multiple color schemes and persistent theme selection."
date: 2024-03-19
category: "feature"
tags: ["React", "TypeScript", "Styling", "Accessibility"]
codeSnippets: 8
aiPromptCount: 12
filesChanged: [
  "src/components/ThemeSwitcher.tsx",
  "src/layouts/Layout.astro",
  "src/lib/themes.ts",
  "src/styles/themes.css",
  "src/components/Navigation.astro",
  "src/components/CommandPostTile.tsx"
]
---

Let's add some personality to our site with a theme switcher! I started with a simple dropdown in the top right, but after some back and forth, we moved it into the navigation bar where it feels more natural.

## The Themes

We've got four distinct themes to play with:

- A clean, modern default theme with purple accents
- A dark mode that's easy on the eyes
- A high contrast theme for maximum readability
- And my personal favorite - a retro terminal theme that makes everything feel like we're hacking the matrix

## The Journey

The first version was... well, let's say it had some issues. The themes would flicker on page load (not great), the colors weren't quite right (especially in dark mode), and the high contrast theme wasn't actually high contrast at all!

So, we rolled up our sleeves and:
1. Fixed the flickering by loading the theme before anything else renders
2. Refined all the colors to ensure proper contrast
3. Made the terminal theme properly "terminal-y" with that classic green text
4. Moved the switcher into the nav bar where it belongs
5. Made everything smooth with nice transitions

## The Technical Bits

The theme switcher is built with React and uses localStorage to remember your preference. Here's a peek at how it works:

```typescript
const [theme, setTheme] = useState<ThemeOption>(() => {
if (typeof window !== 'undefined') {
return (localStorage.getItem('theme') as ThemeOption) || 'default';
}
return 'default';
});
```

```css
/* Default theme */
:root {
--text: #1a1a1a;
--accent: #7C3AED;
/* ...more variables */
}
/* Dark theme */
[data-theme="dark"] {
--text: #ffffff;
--accent: #A855F7;
/* ...more variables */
}
```


## The Challenges

The biggest headache? Getting the colors just right. What looks good in light mode might be unreadable in dark mode. And don't get me started on the high contrast theme - turns out "high contrast" means more than just black and white!

The terminal theme was particularly fun to get right. We wanted that authentic terminal feel without sacrificing readability. After a few iterations, we landed on that perfect shade of terminal green (#00FF00, if you're curious).

## What's Next?

There's always room for improvement! Some ideas for the future:
- Maybe add a system theme detection
- Create some theme-specific animations
- Add more themes (got any suggestions?)
- Let users create their own themes

For now though, I'm pretty happy with how it turned out. Give it a try - the theme switcher is right there in the nav bar. Which theme is your favorite?