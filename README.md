# КВАНТОРА - Digital Agency Website

Modern, animated website for a digital development agency with dark theme and smooth interactions.

## 🎨 Features

- **Dark Theme Design**: Elegant dark color scheme with gradient accents
- **Custom Cursor**: Interactive cursor with magnetic effects
- **Smooth Animations**: Scroll-based reveal animations, parallax effects
- **Portfolio Filtering**: Category-based project filtering
- **Contact Form**: Validated form with notifications
- **Fully Responsive**: Mobile-first approach with breakpoints at 1024px, 768px, 480px
- **Performance Optimized**: GPU acceleration, debounced scroll events, reduced motion support
- **Modern CSS**: Glassmorphism, mesh gradients, CSS custom properties

## 📁 Project Structure

```
├── index.html    # Main HTML structure
├── styles.css    # Complete CSS with design system
├── script.js     # JavaScript for interactivity
└── README.md     # This file
```

## 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. No build process or dependencies required - pure HTML/CSS/JS

## 🧪 Testing Responsiveness

### Desktop Testing
- Open in Chrome/Firefox/Safari/Edge
- Resize browser window to test breakpoints
- Check custom cursor interaction
- Test navigation scroll effect
- Verify portfolio filter functionality
- Submit contact form to test validation

### Mobile Testing
- Use browser DevTools device emulation (F12 → Toggle Device Toolbar)
- Test at common breakpoints:
  - 1024px (tablet)
  - 768px (mobile landscape)
  - 480px (mobile portrait)
- Verify hamburger menu functionality
- Check that custom cursor is hidden on touch devices
- Ensure all touch interactions work

### Recommended Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Key Sections

1. **Hero**: Animated background orbs, floating cards, CTA buttons
2. **Services**: 4 service cards with hover effects and tags
3. **Portfolio**: Filterable grid with overlay animations
4. **About**: Stats counter animation, floating badges
5. **Contact**: Form with floating labels, social links
6. **Footer**: Navigation links and copyright

## ⚡ Performance Features

- `will-change` for GPU acceleration
- Throttled scroll events (16ms)
- Intersection Observer for lazy animations
- `prefers-reduced-motion` support
- Efficient DOM queries
- No external dependencies

## 🎨 Design System

### Colors
- Background: `#0a0a0f` (dark)
- Primary: `#6366f1` (indigo)
- Secondary: `#8b5cf6` (purple)
- Accent: `#06b6d4` (cyan)

### Typography
- Font: Inter (Google Fonts)
- Weights: 300-900
- Responsive sizing with `clamp()`

### Spacing
- Container max-width: 1280px
- Section padding: 120px (desktop), 80px (mobile)
- Gap values: 16px, 24px, 32px, 60px, 80px

## 📝 Customization

### Colors
Edit CSS variables in `styles.css` `:root`:
```css
--color-primary: #6366f1;
--color-secondary: #8b5cf6;
--color-accent: #06b6d4;
```

### Content
- Update text content directly in `index.html`
- Modify service cards, portfolio items, stats
- Change contact information in footer and contact section

### Animations
Adjust timing in `styles.css`:
- `--transition-fast: 0.2s ease`
- `--transition-normal: 0.3s ease`
- `--transition-slow: 0.5s ease`

## 🐛 Known Limitations

- Form submission is simulated (no backend)
- Portfolio images use gradient placeholders
- Social links are placeholder URLs
- No actual project data

## 📄 License

This is a demonstration project. Feel free to use and modify as needed.

---

**Built with modern web standards and best practices.**
