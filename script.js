// Courses Data with real images
const coursesData = [
    {
        id: 1,
        title: "Learn JavaScript from Scratch",
        description: "Learn JavaScript fundamentals and advanced web programming concepts",
        instructor: "Ahmed Mohamed",
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        title: "React.js - Advanced Level",
        description: "Master application development using React.js and Redux",
        instructor: "Sarah Abdullah",
        price: 399,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Learn the fundamentals of user interface and user experience design",
        instructor: "Mohamed Al-Khaled",
        price: 249,
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        title: "Python for Programmers",
        description: "Master Python language and its applications in various fields",
        instructor: "Ahmed Mohamed",
        price: 349,
        imageUrl: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        title: "Mobile App Development",
        description: "Learn to develop iOS and Android applications using React Native",
        instructor: "Fatima Al-Ali",
        price: 449,
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        title: "Information Security",
        description: "Learn the basics of information security and application protection",
        instructor: "Khaled Al-Saad",
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    }
];

// Application State
let state = {
    courses: coursesData,
    enrollments: [],
    filters: {
        search: '',
        instructor: '',
        minPrice: 0,
        maxPrice: 1000
    }
};

// DOM Elements
const coursesGrid = document.getElementById('coursesGrid');
const enrollmentsList = document.getElementById('enrollmentsList');
const totalPriceElement = document.getElementById('totalPrice');
const cartCountElement = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const instructorFilter = document.getElementById('instructorFilter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const applyFiltersBtn = document.getElementById('applyFilters');
const clearFiltersBtn = document.getElementById('clearFilters');
const enrollmentsSidebar = document.getElementById('enrollmentsSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const notification = document.getElementById('notification');

// Initialize Application
function init() {
    renderCourses();
    renderEnrollments();
    populateInstructors();
    loadFromLocalStorage();
    setupEventListeners();
    updateCartCount();
}

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    applyFiltersBtn.addEventListener('click', applyFilters);
    clearFiltersBtn.addEventListener('click', clearFilters);
    closeSidebar.addEventListener('click', toggleSidebar);
    
    // Price inputs
    minPriceInput.addEventListener('input', () => {
        state.filters.minPrice = parseInt(minPriceInput.value) || 0;
    });
    
    maxPriceInput.addEventListener('input', () => {
        state.filters.maxPrice = parseInt(maxPriceInput.value) || 1000;
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (!enrollmentsSidebar.contains(event.target) && 
            !event.target.classList.contains('cart-btn') &&
            !event.target.closest('.cart-btn') &&
            enrollmentsSidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && enrollmentsSidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
}

// Render Courses
function renderCourses() {
    const filteredCourses = getFilteredCourses();
    
    coursesGrid.innerHTML = filteredCourses.map(course => `
        <div class="course-card">
            <div class="course-image" style="background-image: url('${course.imageUrl}')">
                <div class="course-image-overlay"></div>
            </div>
            ${isEnrolled(course.id) ? '<div class="enrolled-badge">Enrolled</div>' : ''}
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-info">
                    <span class="instructor">👤 ${course.instructor}</span>
                    <span class="course-price">💰 $${course.price}</span>
                </div>
                <button class="enroll-btn ${isEnrolled(course.id) ? 'enrolled' : ''}" 
                        onclick="${isEnrolled(course.id) ? 'cancelEnrollment(' + course.id + ')' : 'enrollCourse(' + course.id + ')'}"
                        ${isEnrolled(course.id) ? 'disabled' : ''}>
                    ${isEnrolled(course.id) ? 'Already Enrolled' : 'Enroll in Course'}
                </button>
            </div>
        </div>
    `).join('');
}

// Render Enrollments
function renderEnrollments() {
    if (state.enrollments.length === 0) {
        enrollmentsList.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>No courses enrolled yet</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Start by enrolling in some courses!</p>
            </div>
        `;
        totalPriceElement.textContent = '0';
        return;
    }

    enrollmentsList.innerHTML = state.enrollments.map(course => `
        <div class="enrollment-item">
            <h4>${course.title}</h4>
            <p>👤 ${course.instructor}</p>
            <p class="price">💰 $${course.price}</p>
            <button class="cancel-btn" onclick="cancelEnrollment(${course.id})">
                Cancel Enrollment
            </button>
        </div>
    `).join('');

    updateTotalPrice();
    updateCartCount();
}

// Update Total Price
function updateTotalPrice() {
    const total = state.enrollments.reduce((sum, course) => sum + course.price, 0);
    totalPriceElement.textContent = total;
}

// Update Cart Count
function updateCartCount() {
    cartCountElement.textContent = state.enrollments.length;
}

// Enroll in Course
function enrollCourse(courseId) {
    const course = state.courses.find(c => c.id === courseId);
    if (course && !isEnrolled(courseId)) {
        state.enrollments.push(course);
        renderCourses();
        renderEnrollments();
        saveToLocalStorage();
        showNotification(`Successfully enrolled in "${course.title}"!`, 'success');
    }
}

// Cancel Enrollment
function cancelEnrollment(courseId) {
    const courseIndex = state.enrollments.findIndex(course => course.id === courseId);
    if (courseIndex !== -1) {
        const course = state.enrollments[courseIndex];
        state.enrollments.splice(courseIndex, 1);
        renderCourses();
        renderEnrollments();
        saveToLocalStorage();
        showNotification(`Enrollment canceled for "${course.title}"`, 'warning');
        
        // Auto-close sidebar if no enrollments left
        if (state.enrollments.length === 0) {
            setTimeout(toggleSidebar, 1500);
        }
    }
}

// Complete Enrollment Process
function completeEnrollment() {
    if (state.enrollments.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = state.enrollments.reduce((sum, course) => sum + course.price, 0);
    showNotification(`Enrollment completed! Total: $${total}. Thank you!`, 'success');
    
    // Clear enrollments after completion
    state.enrollments = [];
    renderCourses();
    renderEnrollments();
    saveToLocalStorage();
    toggleSidebar();
}

// Check if Course is Enrolled
function isEnrolled(courseId) {
    return state.enrollments.some(course => course.id === courseId);
}

// Handle Search
function handleSearch() {
    state.filters.search = searchInput.value.toLowerCase();
    renderCourses();
}

// Apply Filters
function applyFilters() {
    state.filters.instructor = instructorFilter.value;
    state.filters.minPrice = parseInt(minPriceInput.value) || 0;
    state.filters.maxPrice = parseInt(maxPriceInput.value) || 1000;
    renderCourses();
    showNotification('Filters applied successfully!', 'success');
}

// Clear All Filters
function clearFilters() {
    state.filters = {
        search: '',
        instructor: '',
        minPrice: 0,
        maxPrice: 1000
    };
    
    searchInput.value = '';
    instructorFilter.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    
    renderCourses();
    showNotification('All filters cleared!', 'success');
}

// Get Filtered Courses
function getFilteredCourses() {
    return state.courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(state.filters.search) ||
                            course.description.toLowerCase().includes(state.filters.search);
        const matchesInstructor = !state.filters.instructor || course.instructor === state.filters.instructor;
        const matchesPrice = course.price >= state.filters.minPrice && 
                           course.price <= state.filters.maxPrice;
        
        return matchesSearch && matchesInstructor && matchesPrice;
    });
}

// Populate Instructors Dropdown
function populateInstructors() {
    const instructors = [...new Set(state.courses.map(course => course.instructor))];
    instructorFilter.innerHTML = '<option value="">All Instructors</option>' +
        instructors.map(instructor => 
            `<option value="${instructor}">${instructor}</option>`
        ).join('');
}

// Toggle Sidebar
function toggleSidebar() {
    enrollmentsSidebar.classList.toggle('active');
}

// Show Notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('courseEnrollments', JSON.stringify(state.enrollments));
}

// Load from Local Storage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('courseEnrollments');
    if (saved) {
        state.enrollments = JSON.parse(saved);
        renderEnrollments();
        renderCourses();
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', init);