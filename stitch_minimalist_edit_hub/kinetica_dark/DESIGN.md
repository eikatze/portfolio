# Design System Strategy: The Cinematic Minimalist

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Digital Curator."** In the world of high-end video editing, the interface must never compete with the content; it must act as a darkened theater—a silent, sophisticated frame that elevates the moving image. 

We are moving away from "template-style" layouts. This system rejects the rigid, boxy constraints of standard web design in favor of **Intentional Asymmetry** and **Tonal Depth**. By utilizing overlapping elements and varying typographic scales, we create a sense of motion even in static layouts. The goal is to make the user feel they are navigating a high-end film treatment or a physical gallery space rather than a generic portfolio site.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Deep Space" charcoal (`#0e0e0f`), providing a canvas where the primary accent (`#ba9eff` / Electric Violet) can vibrate with technological energy.

### The "No-Line" Rule
Standard UI relies on borders to separate content. This design system **prohibits 1px solid borders** for sectioning. Boundaries must be defined through:
*   **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
*   **Tonal Transitions:** Using subtle value changes to imply a change in context.
*   **Negative Space:** Using generous, intentional "white space" (black space) to let elements breathe.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of "Obsidian Glass." 
*   **Base Layer:** `surface` (#0e0e0f) for the main background.
*   **Nesting:** Place a `surface-container-high` (#1f1f21) card inside a `surface-container-low` (#131314) section. This creates a "lift" that feels organic and integrated, rather than stuck on top.

### The "Glass & Gradient" Rule
To add "soul" to the digital environment, use **Glassmorphism** for floating UI elements (like navigation bars or video overlays). 
*   Apply `surface-container-highest` at 60% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** Main CTAs should utilize a linear gradient from `primary` (#ba9eff) to `primary-dim` (#8455ef) at a 135-degree angle to provide a sense of luminosity.

---

## 3. Typography: The Editorial Voice
We use a high-contrast pairing to balance technical precision with creative flair.

*   **Display & Headlines (Epilogue):** These are our "title cards." Epilogue’s bold, geometric weight conveys authority. Use `display-lg` for hero statements, ensuring tight tracking (-2%) to mimic high-end film credits.
*   **Body & Titles (Inter):** Inter provides the "technical metadata." It is hyper-legible and clean. Use `body-md` for descriptions and `label-sm` for technical specs (e.g., frame rates, codecs).
*   **Hierarchy as Identity:** Use extreme scale differences. A `display-lg` headline paired with a `label-md` sub-caption creates an editorial feel that screams "Premium Portfolio."

---

## 4. Elevation & Depth
In a borderless system, depth is the only way to guide the eye.

*   **The Layering Principle:** Stack your containers. A project card (`surface-container-lowest`) sitting on a `surface-container-low` section creates a recessed, "etched" look.
*   **Ambient Shadows:** For elements that truly "float" (like modals or tooltips), use extra-diffused shadows. 
    *   *Spec:* `0px 20px 40px rgba(0, 0, 0, 0.4)`. 
    *   Avoid grey shadows; ensure the shadow is a deeper tint of the background to maintain the "inky" feel of the dark theme.
*   **The "Ghost Border" Fallback:** If a container is lost against its background, use a "Ghost Border": `outline-variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components & Interactive Patterns

### Buttons
*   **Primary:** A luminous block using the `primary` to `primary-dim` gradient. No border. Text in `on-primary-fixed` (Black).
*   **Secondary:** A "Ghost" style. No fill, but a `ghost-border` that glows (increases opacity) on hover.

### Project Cards & Video Grid
*   **Forbid Dividers:** Use `surface-container-high` for the card background against a `surface` background.
*   **The "Cinematic Crop":** Project thumbnails should use a 21:9 or 16:9 aspect ratio. 
*   **Hover State:** On hover, the card should transition from `surface-container-high` to `surface-container-highest` with a subtle scale-up (1.02x) of the internal image.

### Service Pricing Tables
*   Instead of vertical columns, use a "Stacked Tier" approach. Use `surface-container-low` for the base and `primary-container` for the "Recommended" tier to make it pop with a violet glow.
*   Avoid checkmark icons; use `primary` colored typography for "Features Included."

### Interactive Contact Forms
*   **Input Fields:** Minimalist "Underline" style or a subtle `surface-container-highest` block.
*   **Focus State:** When an input is active, use a `primary` (#ba9eff) glow on the bottom edge. No heavy focus rings.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts where the video thumbnail overlaps the headline text slightly.
*   **Do** use `primary` (#ba9eff) sparingly for "Actionable" items only. It is a beacon, not a paint bucket.
*   **Do** ensure all transitions are "Ease-in-out" with a duration of 300ms-500ms to mimic the feel of a film fade.

### Don't:
*   **Don't** use 100% white (#ffffff) for long-form body text; use `on-surface-variant` (#adaaab) to reduce eye strain against the black background.
*   **Don't** use standard "Drop Shadows" that look like 2010-era skeuomorphism. Stick to tonal shifts.
*   **Don't** crowd the interface. If a video is playing, all other UI elements (labels, buttons) should reduce in opacity to let the work shine.

### Accessibility Note:
While we use a dark theme, ensure that `on-background` text maintains a high contrast ratio against `surface` containers. Even in a "cool" dark theme, readability is the ultimate sign of professionalism.