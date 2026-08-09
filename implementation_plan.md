# Implementation Plan - Modern Website for Cafe Durga (Pune)

Create a state-of-the-art, visually stunning, high-converting commercial website for **Cafe Durga**, Pune's iconic cafe chain famous for its thick Cold Coffee, Misal Pav, Sandwiches, and budget-friendly fast food since 2003. The website will be designed as a pitch-ready product that can be sold to the Cafe Durga management/franchise owners.

## User Review Required

> [!IMPORTANT]
> **Key Pitch Highlights for Cafe Durga Management included in design:**
> 1. **Iconic Pune Branding**: Brown roast & caramel gold theme representing Pune's favorite Cold Coffee culture.
> 2. **Interactive Menu & Live Cart**: Filter by categories (Coffee & Shakes, Misal & Snacks, Egg Specials, Sandwiches, Rice & Combos), Veg/Non-Veg badges, live cart drawer, and takeaway/dine-in order simulation.
> 3. **Interactive Branch Locator**: Instant lookup for Pune outlets (Kothrud, FC Road, Baner, Karve Nagar, Erandwane, Viman Nagar, Wakad) with operating hours and directions.
> 4. **Franchise Inquiry Portal & Calculator**: Dedicated high-converting portal for new franchise leads (Investment ₹10L - ₹20L calculator & lead form), which is a key business driver for Cafe Durga.
> 5. **Generated Product Assets**: High-resolution custom AI images for signature products (Famous Cold Coffee with Ice Cream, Pune Misal Pav, Egg Bhurji, Grilled Cheese Sandwich, Pav Bhaji, Cold Chocolate).

## Proposed Changes

### Web Application Architecture

#### [NEW] [index.html](file:///c:/Users/Shreyas/OneDrive/Desktop/durga%20cafe/index.html)
- Main entry point featuring SEO metadata, Google Fonts (Outfit & Plus Jakarta Sans), font-awesome icons.
- **Hero Section**: Dynamic banner with stat counters ("75+ Outlets", "20K+ Daily Coffee Fans", "Est. 2003"), CTA buttons, live status ("Open Now").
- **Signature Specials Carousel / Highlight**: Cold Coffee, Misal Pav, Cheese Bhurji, Hot Chocolate.
- **Interactive Menu Grid**: Search bar, category filters, veg/non-veg tags, quick view & Add-to-Cart.
- **Brand Story Timeline**: "The Durga Journey" from Kothrud (2003) to pan-Maharashtra expansion.
- **Branch Locator Section**: City/Area filter, outlet card list with status indicators.
- **Franchise Portal**: ROI Calculator slider, Franchise benefits, lead application modal/form.
- **Customer Testimonials**: Reviews from Pune university students, IT professionals, foodies.
- **Interactive Cart Drawer & Order Checkout Modal**: Order summary, branch selector, order mode (Dine-in / Pickup / Delivery redirect).

#### [NEW] [styles.css](file:///c:/Users/Shreyas/OneDrive/Desktop/durga%20cafe/styles.css)
- Comprehensive design system using modern CSS variables:
  - Palette: Dark Roast `#120d0a`, Rich Espresso `#1e1510`, Warm Gold `#d4a373`, Caramel `#e07a5f`, Cream `#fefae0`, Accent Red `#e63946`.
  - Glassmorphic card styling, smooth backdrop blur, glowing badge effects.
  - Micro-interactions: Button hover scaling, floating cart badge counter, menu tab switching animations.
  - Responsive mobile-first grid layouts for smartphones, tablets, and desktop displays.

#### [NEW] [app.js](file:///c:/Users/Shreyas/OneDrive/Desktop/durga%20cafe/app.js)
- **Menu Data Store**: Full categorized menu with titles, descriptions, prices, ratings, prep time, veg/non-veg badges, and image links.
- **Cart Management System**: Add/remove items, quantity updating, subtotal calculation, tax/packaging fee calculation, persistent state in localStorage.
- **Filter & Search Engine**: Real-time fuzzy filtering by food category and keyword search.
- **Branch Finder Engine**: Distance calculation & filter by area (Kothrud, FC Road, Baner, Viman Nagar, etc.).
- **Franchise Calculator Logic**: Dynamic return on investment (ROI) estimator based on location size & seating.
- **Toast Notifications**: Interactive feedback on item add, order submit, and franchise form submission.

#### [NEW] Custom High-Quality Generated Product Images
- Generate high-quality product images for Cafe Durga products (Cold Coffee, Misal Pav, Egg Bhurji, Cheese Sandwich, Pav Bhaji, Cold Chocolate, etc.) saved in `images/` directory.

## Verification Plan

### Automated / Browser Verification
- Launch local web server and verify interactive features via subagent / browser:
  - Verify layout responsiveness on mobile & desktop viewport widths.
  - Test menu item category filtering (Coffee, Misal, Sandwiches, Eggs, Combos).
  - Test item search bar reactivity.
  - Test adding multiple items to cart, adjusting quantities, and opening cart drawer.
  - Test branch search and franchise ROI calculator slider.
  - Confirm all image paths resolve properly.
