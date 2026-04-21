# Design System Strategy: The Electric Editor

## 1. Overview & Creative North Star
**Creative North Star: "The Chromatic Pulse"**

This design system is not a utility; it is a high-performance instrument for video editors and digital creators. It rejects the "flat" aesthetic of standard SaaS platforms in favor of a **High-End Editorial** experience. We are creating a digital workspace that feels like a darkened studio where the only things that matter are the footage and the tools of the craft.

The aesthetic is driven by **Atmospheric Depth** and **High-Voltage Contrast**. By pairing the deep, obsidian tones of the background with the sharp, acidic precision of `#FDE047` (Yellow), we mirror the intensity of a high-end editing suite. We break the template look through:
- **Intentional Asymmetry:** Utilizing staggered layouts that mimic film strips and timelines.
- **Tonal Layering:** Moving away from borders and into the realm of "physical" depths.
- **Cinematic Typography:** Using the Epilogue typeface to bridge the gap between technical precision and artistic expression.

---

## 2. Colors: High-Voltage Noir
Our palette is rooted in the "Kinetica" heritage but evolved for maximum impact.

### Color Tokens
*   **Primary Accent:** `#FDE047` (Primary Container) — Use this for the "moment of action." It is the spark in the dark.
*   **The Foundation:** `#16130a` (Background/Surface) — A warm, ink-like black that provides more soul than a pure neutral grey.
*   **Functional Accents:**
    *   `secondary`: `#d6c784` (Muted Gold) for secondary actions.
    *   `tertiary`: `#3bf7ff` (Electric Cyan) for playback states or timeline markers.

### The "No-Line" Rule
**Borders are forbidden for sectioning.** To separate a sidebar from the main canvas, you must use a background shift. For example, place a `surface-container-low` (#1E1C12) panel against the `surface` (#16130A) background. This creates a "felt" boundary rather than a "seen" one, maintaining a premium, seamless look.

### Surface Hierarchy & Nesting
Treat the UI as stacked layers of dark glass.
1.  **Base Layer:** `surface` (#16130a)
2.  **Section Layer:** `surface-container-low` (#1e1c12)
3.  **Component Layer (Cards/Modals):** `surface-container-high` (#2d2a1f)
4.  **Floating Elements:** `surface-bright` (#3c392e) with Backdrop Blur.

### Signature Textures
Use subtle linear gradients for Primary CTAs. Instead of a flat `#FDE047`, use a transition from `primary_fixed` (#FFE24C) to `primary_container` (#FDE047). This subtle 3D "sheen" gives buttons a physical, tactile presence.

---

## 3. Typography: The Editorial Edge
We use **Epilogue** exclusively. It is a font that carries the weight of a technical sans-serif but with the personality of a boutique design agency.

*   **Display (Display-LG 3.5rem):** Use for hero moments and big numbers (e.g., "00:42:15"). Track it tight (-2%) for a brutalist editorial feel.
*   **Headlines (Headline-MD 1.75rem):** Use for section headers. Always in Medium or Semi-Bold weight to command authority.
*   **The Label System (Label-SM 0.6875rem):** Use for technical metadata (Frame rates, Codecs). These should be in All Caps with increased letter spacing (+5%) to feel like a pro-grade toolset.
*   **Body (Body-MD 0.875rem):** Keep lines short and spacing generous. Use `on_surface_variant` (#cec6ad) for secondary text to maintain the dark-mode hierarchy.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to indicate "elevation" in the traditional sense. We use **light and transparency**.

*   **The Layering Principle:** Place a `surface-container-highest` (#38352a) element on a `surface-container-low` (#1e1c12) to create a natural "lift."
*   **Ambient Shadows:** If an element must float (like a context menu), use a massive blur (40px+) at 8% opacity using the `on_surface` color as the shadow tint. It should look like an ambient occlusion glow, not a drop shadow.
*   **Glassmorphism:** For overlays, use `surface_container_highest` at 70% opacity with a `20px` backdrop-blur. This keeps the user grounded in their work by letting the timeline colors bleed through the UI.
*   **The "Ghost Border":** For buttons or input fields that need definition, use `outline_variant` (#4b4734) at **15% opacity**. It should be barely perceptible—a whisper of a boundary.

---

## 5. Components: Precision Engineered

### Buttons
*   **Primary:** Background `#FDE047`, Text `#393000`. High contrast, bold. Use `Rounded-MD` (0.375rem).
*   **Secondary:** Background `none`, Ghost Border (15% opacity), Text `#FDE047`.
*   **Tertiary:** Text `secondary` (#d6c784), no background. Use for low-priority "Cancel" or "Back" actions.

### Cards & Timelines
*   **The Rule:** No dividers. Use `surface-container-low` for the card body and `surface-container-high` for the header area to distinguish regions.
*   **Spacing:** Use generous padding (1.5rem+) to allow the "noir" aesthetic to breathe.

### Input Fields
*   **Style:** Underline only or Ghost Border. When focused, the bottom border "charges" up with the `#FDE047` Primary color.
*   **Helper Text:** Always in `label-sm` with high letter-spacing.

### Chips (Tags)
*   Used for video tags (e.g., "4K", "60fps"). Use `surface-container-highest` background with `on_surface_variant` text. High roundedness (`full`).

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. A sidebar that is slightly "shorter" than the main canvas creates a sophisticated, custom look.
*   **Do** use the Yellow (#FDE047) sparingly. It is a laser pointer, not a paint bucket. Use it to draw the eye to the most critical action.
*   **Do** embrace negative space. Dark mode feels premium when it feels vast.

### Don't:
*   **Don't** use 1px solid, high-contrast borders. It kills the "studio" vibe and makes the UI look like a spreadsheet.
*   **Don't** use pure white text. Always use `on_surface` (#e9e2d2) or `on_surface_variant` (#cec6ad) to reduce eye strain and maintain the "noir" mood.
*   **Don't** use standard "Blue" for links or success states. Use the `tertiary` (#3bf7ff) for a more modern, cinematic feel.

---

## 7. Signature Interaction Hint
When a user hovers over a primary element, consider a subtle "outer glow" using a 10% opacity version of the yellow accent. It should feel like the component is "powering on."