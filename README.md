# School Website

A modern, interactive, and responsive website designed for educational institutions.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI**: Smooth animations, hover effects, and engaging user interactions
- **Modern Navigation**: Fixed navigation bar with smooth scrolling and active section highlighting
- **Hero Section**: Eye-catching hero section with call-to-action buttons
- **Stats Counter**: Animated statistics counter that triggers on scroll
- **Programs Showcase**: Detailed program cards with hover effects
- **Faculty Section**: Display faculty members with profile cards
- **Admissions Info**: Comprehensive admissions information with inquiry form
- **Contact Section**: Easy-to-find contact information
- **Mobile Menu**: Responsive mobile navigation menu
- **Form Validation**: Built-in form handling with success notifications
- **Accessibility**: Keyboard navigation support and semantic HTML

## File Structure

```
school_site/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # Interactive features and functionality
├── logo.png        # School logo (place your logo here)
└── README.md       # This file
```

## Setup Instructions

1. **Add Your School Logo**
   - Place your school logo as `logo.png` in the root directory
   - The logo will appear in the navigation bar and footer
   - Recommended size: 200x200px or similar square dimensions
   - Transparent background (PNG) works best

2. **Customize Content**
   - Open `index.html` and update:
     - School name (replace "School Name")
     - Contact information (address, phone, email)
     - Faculty members
     - Programs and course details
     - Statistics numbers
     - Important dates

3. **Customize Colors**
   - Open `styles.css` and modify the CSS variables in `:root`:
     ```css
     --primary-color: #2563eb;    /* Main brand color */
     --secondary-color: #1e40af;   /* Secondary brand color */
     --accent-color: #f59e0b;      /* Accent color */
     ```

4. **Launch the Website**
   - Simply open `index.html` in a web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```

## Customization Guide

### Changing Colors
The website uses CSS variables for easy color customization. Update these in `styles.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Adding/Removing Sections
Each section has a clear structure in `index.html`. Simply:
- Copy an existing section structure
- Update the content
- Ensure the section has a unique `id` attribute
- Add the section link to the navigation menu

### Modifying the Form
The inquiry form in the Admissions section can be customized:
1. Add/remove form fields in `index.html`
2. Update the form handling in `script.js` (search for `inquiryForm`)
3. Connect to your backend/email service for actual form submissions

### Adding Images
Replace placeholder elements with actual images:
1. Add your images to the directory
2. Update the `src` attributes in `index.html`
3. Update the `onerror` handlers if needed

## Features Breakdown

### Interactive Elements
- Animated stats counter
- Smooth scroll navigation
- Mobile hamburger menu
- Hover effects on cards
- Form submission with notifications
- Parallax hero section
- 3D card tilt effects

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 968px
- Desktop: > 968px

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states for interactive elements
- Proper heading hierarchy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The website is optimized for performance:
- Minimal dependencies (no external libraries required)
- CSS animations using GPU acceleration
- Intersection Observer for efficient scroll detection
- Lazy loading ready for images

## Future Enhancements

Consider adding:
- Image gallery for campus photos
- News/blog section
- Events calendar
- Student testimonials
- Virtual tour
- Online payment integration
- Parent/student portal links
- Multi-language support

## Support

For questions or issues, please contact the web development team.

## License

© 2026 School Name. All rights reserved.
# school_site_01
