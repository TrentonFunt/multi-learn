# MultiLearn Design System

This document outlines the design system adapted from the EduPress UI Kit, tailored specifically for MultiLearn.

## 🎨 Color Palette

### Primary Colors
- **Default**: `#FF7820` - Main brand color for buttons, links, and accents
- **Hover**: `#FFAB2D` - Lighter orange for hover states
- **Pressed**: `#F8620E` - Darker orange for pressed/active states

### Absolute Colors
- **Black**: `#000000` - Primary text color
- **White**: `#FFFFFF` - Background and light text

### Neutral Colors
- **Dark Grey**: `#555555` - Secondary text
- **Grey**: `#909090` - Tertiary text and borders
- **Light Grey**: `#FAFAFA` - Light backgrounds
- **White Grey**: `#F5F5F5` - Subtle borders and dividers

### Status Colors
- **Info**: `#2580D5` - Information messages
- **Success**: `#558E24` - Success states and positive actions
- **Warning**: `#FEAEAEA` - Warning messages
- **Danger**: `#F31A1A` - Error states and destructive actions

## 📝 Typography

### Font Families
- **Primary**: `Jost` - Used for body text, paragraphs, and general content
  - Regular (400) - Body text
  - Medium (500) - Emphasized text
- **Secondary**: `Exo` - Used for headings and display text
  - SemiBold (600) - Headings and titles

### Font Usage
```css
/* Headings */
font-family: 'Exo', sans-serif;
font-weight: 600;

/* Body Text */
font-family: 'Jost', sans-serif;
font-weight: 400; /* Regular */
font-weight: 500; /* Medium */
```

## 🔘 Button Styles

### Button Sizes
- **Large (Desktop)**: 
  - Font size: 18px
  - Line height: 150%
  - Padding: 10px 24px
- **Small (Mobile)**:
  - Font size: 14px
  - Line height: 150%
  - Padding: 10px 15px

### Button Variants

#### Outline Buttons
- **Default**: White background, orange border, orange text
- **Hover**: Light orange background, orange border, orange text
- **Pressed**: Darker orange background, orange border, orange text
- **Disabled**: Light grey background, light grey border, light grey text

#### Fill Buttons
- **Default**: Orange background, white text
- **Hover**: Darker orange background, white text
- **Pressed**: Even darker orange background, white text
- **Disabled**: Light grey background, white text

#### Text Link Buttons
- **Default**: Orange text, no background
- **Hover**: Orange text, underlined
- **Pressed**: Darker orange text, underlined
- **Disabled**: Light grey text, no background

## 📝 Input Field Styles

### Input Sizes
- **Large (Desktop)**:
  - Font size: 18px
  - Line height: 150%
  - Padding: 10px 24px
- **Small (Mobile)**:
  - Font size: 14px
  - Line height: 150%
  - Padding: 10px 15px

### Input States
- **Placeholder**: Light grey text, light grey border
- **Focus**: Orange border
- **Typing**: Black text, light grey border
- **Filled**: Black text, light grey border
- **Error**: Red border, red text

## 🎯 Course Item Components

### Grid Layout
- **Default**: White background with course image
- **Hover**: Light purple/indigo background with icon
- **Price**: Green for free courses, orange for paid
- **Category Tag**: Small black tag on image

### List Layout
- **Default**: Horizontal layout with icon and details
- **Hover**: Light purple/indigo background
- **Details**: Duration, students, level, lessons count

## 🎨 Component Guidelines

### Spacing
- Use consistent spacing units (4px, 8px, 16px, 24px, 32px)
- Maintain proper visual hierarchy
- Ensure adequate touch targets (minimum 44px)

### Shadows
- Subtle shadows for cards and elevated elements
- Consistent shadow depth across components

### Border Radius
- Small elements: 4px
- Cards and containers: 8px
- Large containers: 12px

### Icons
- Use outline-style icons for consistency
- Maintain consistent icon sizes (16px, 20px, 24px)
- Use appropriate colors based on context

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Considerations
- Use smaller button and input sizes
- Ensure touch-friendly interactions
- Optimize for one-handed use

## 🎯 Implementation Notes

### CSS Variables
All colors are available as CSS custom properties:
```css
var(--primary-default)
var(--primary-hover)
var(--primary-pressed)
/* ... and so on */
```

### Tailwind Integration
The design system is integrated with Tailwind CSS for easy usage:
```html
<button class="bg-[#FF7820] hover:bg-[#FFAB2D] text-white">
  Primary Button
</button>
```

### Accessibility
- Ensure sufficient color contrast ratios
- Provide focus indicators
- Use semantic HTML elements
- Include proper ARIA labels

---

*This design system is adapted from the EduPress UI Kit by ThimPress, tailored specifically for MultiLearn.*
