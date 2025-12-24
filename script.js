// Main JavaScript file for AAU Dorm Management System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize form validations
    initializeForms();
    
    // Load initial data
    loadInitialData();
});

function initializeTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function(e) {
            const tooltipText = this.querySelector('.tooltip-text');
            if (tooltipText) {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            }
        });
        
        tooltip.addEventListener('mouseleave', function(e) {
            const tooltipText = this.querySelector('.tooltip-text');
            if (tooltipText) {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            }
        });
    });
}

function initializeForms() {
    // Validate student ID format
    const studentIdInputs = document.querySelectorAll('input[placeholder*="UGR/"]');
    studentIdInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidStudentId(value)) {
                this.style.borderColor = '#dc3545';
                showError(this, 'Student ID must be in format: UGR/YYYY/XX');
            } else {
                this.style.borderColor = '#ddd';
                hideError(this);
            }
        });
    });

    // Validate email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidEmail(value)) {
                this.style.borderColor = '#dc3545';
                showError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '#ddd';
                hideError(this);
            }
        });
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
}

function isValidStudentId(id) {
    const pattern = /^UGR\/\d{4}\/\d{2}$/;
    return pattern.test(id);
}

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function showError(input, message) {
    // Remove existing error message
    hideError(input);
    
    // Create error element
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#dc3545';
    error.style.fontSize = '12px';
    error.style.marginTop = '5px';
    error.textContent = message;
    
    input.parentNode.appendChild(error);
}

function hideError(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function loadInitialData() {
    // Check if we're on a page that needs data
    if (document.querySelector('.floors-container')) {
        updateDormStatistics();
    }
    
    if (document.getElementById('availabilityTable')) {
        updateRealTimeAvailability();
    }
}

function updateDormStatistics() {
    // This would typically fetch from an API
    const stats = {
        totalDorms: 200,
        totalStudents: 1200,
        availableBeds: 179,
        waitingList: 45
    };
    
    // Update stats cards if they exist
    const statCards = document.querySelectorAll('.stat-card h3');
    if (statCards.length >= 4) {
        statCards[0].textContent = stats.totalDorms;
        statCards[1].textContent = stats.totalStudents;
        statCards[2].textContent = stats.availableBeds;
        statCards[3].textContent = stats.waitingList;
    }
}

function updateRealTimeAvailability() {
    // Simulate real-time updates
    setInterval(() => {
        // This would fetch from API in real implementation
        console.log('Updating availability data...');
    }, 30000); // Update every 30 seconds
}

// Photo upload preview
function previewPhoto(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (input && preview) {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
    }
}

// Search functionality
function setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(function() {
            performSearch(this.value);
        }, 300));
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function performSearch(query) {
    // This would make an API call in real implementation
    console.log('Searching for:', query);
    
    // Update UI based on search results
    const tableRows = document.querySelectorAll('#availabilityTable tr');
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Export data
function exportData(format) {
    const data = {
        format: format,
        timestamp: new Date().toISOString()
    };
    
    // This would generate and download the file
    alert(Exporting data as ${format.toUpperCase()}...);
    
    // In real implementation:
    // if (format === 'csv') exportCSV();
    // else if (format === 'excel') exportExcel();
    // else if (format === 'pdf') exportPDF();
}

// Print functionality
function printPage() {
    window.print();
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = notification notification-${type};
    notification.innerHTML = 
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    ;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Theme switcher (optional)
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Initialize theme on load
loadTheme();
// Responsive menu toggle for mobile
function setupMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('.header');
    const nav = document.querySelector('.main-nav');
    
    if (header && nav && window.innerWidth <= 768) {
        header.insertBefore(menuToggle, nav);
        
        menuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Adjust on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                nav.style.display = '';
            }
        });
    }
}

// Initialize mobile menu
setupMobileMenu();
