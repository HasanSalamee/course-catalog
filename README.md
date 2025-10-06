# MyCourses - Online Learning Platform

A responsive course catalog web application that allows users to browse, search, and enroll in online courses.

![Course Catalog Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=MyCourses+Demo)

## Features

-  Course Catalog** - Browse available courses with detailed information
-  Advanced Search** - Search courses by title, description, or keywords
-  Smart Filtering** - Filter by instructor and price range
-  Enrollment System** - Add courses to your enrollment cart
-  Price Calculator** - Automatic total price calculation
-  Data Persistence** - Courses saved in localStorage
-  Responsive Design** - Works perfectly on desktop, tablet, and mobile
-  Modern UI** - Beautiful gradient design with smooth animations

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Emoji icons for cross-platform compatibility
- **Storage**: localStorage for data persistence
- **Design**: Responsive design with mobile-first approach

## Installation

To run this project locally, follow these steps:

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge)
- A code editor (VS Code recommended)
- Live Server extension (for local development)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/HasanSalamee/course-catalog.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd course-catalog
   ```

3. **Open with VS Code**
   ```bash
   code .
   ```

4. **Run with Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or install Live Server extension and click "Go Live"

### Alternative: Simple Setup
1. Download the project files
2. Open `index.html` directly in your browser

## How to Use

### Browsing Courses
- View all available courses in the main grid
- Each course shows title, description, instructor, and price
- Click course images to view details

### Searching & Filtering
- Use the search bar to find courses by title or description
- Filter by specific instructors using the dropdown
- Set price range with min/max price inputs

### Enrollment Process
1. Click "Enroll in Course" on any course card
2. View your enrollments in the sidebar cart
3. See the running total price
4. Cancel enrollment if needed
5. Complete enrollment when ready

### Mobile Usage
- Fully responsive design adapts to any screen size
- Touch-friendly buttons and interfaces
- Optimized for mobile browsing

##  Project Structure

```
course-catalog/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
├── image/
│   └── background.jpg  # Background image
└── README.md          # Project documentation
```

## Customization

### Adding New Courses
Edit the `coursesData` array in `script.js`:

```javascript
{
    id: 7,
    title: "Your Course Title",
    description: "Course description here",
    instructor: "Instructor Name",
    price: 299,
    imageUrl: "https://example.com/image.jpg"
}
```

### Changing Colors
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
}
```

## Browser Support

-  Chrome 60+
-  Firefox 55+
-  Edge 79+
-  Mobile browsers

## Known Issues

- None currently - report any issues in the GitHub issues section

## Future Enhancements

- [ ] User authentication system
- [ ] Payment integration
- [ ] Course progress tracking
- [ ] Student reviews and ratings
- [ ] Instructor dashboards
- [ ] Course categories and tags
- [ ] Wishlist functionality
- [ ] Social sharing features

## Support

If you have any questions or need help with setup:

-  Email: hasansalami129@gmail.com
-  [Create an Issue](https://github.com/HasanSalamee/course-catalog/issues)

##  Acknowledgments

- Course images from [Unsplash](https://unsplash.com)
- Icons from Emoji library
- Design inspiration from modern learning platforms

##  License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">

###  Don't forget to star this repository if you found it helpful!

**Built with ❤️ by Hasan Salamee

</div>
```
