// Toggle mobile menu functionality
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Change theme functionality
function changeTheme() {
    const theme = document.getElementById('theme').value;
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('preferred-theme', theme);
}

// Highlight item on hover
function highlightItem(element) {
    element.style.backgroundColor = element.classList.contains('dark-theme') ? '#3a3a3a' : '#f0f8ff';
    element.style.cursor = 'pointer';
}

// Remove highlight on mouse out
function removeHighlight(element) {
    element.style.backgroundColor = '';
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        document.getElementById('theme').value = savedTheme;
        changeTheme();
    }
    
    // Add click event to product items for details view
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't trigger if clicking the Add to Cart button
            if (e.target.classList.contains('add-to-cart')) {
                e.preventDefault();
                e.stopPropagation();
                
                // Simulate adding to cart
                const productName = item.querySelector('h3').textContent;
                alert(`Added to cart: ${productName}`);
                return;
            }
            
            const productName = item.querySelector('h3').textContent;
            window.location.href = `#product-details?name=${encodeURIComponent(productName)}`;
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
    
    // Highlight current section in navigation based on scroll position
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection();
});

// Highlight current section in navigation based on scroll position
function highlightCurrentSection() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Get current scroll position
    const scrollY = window.pageYOffset;
    
    // Check each section to see if it's in view
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        const sectionId = section.getAttribute('id');
        
        // If we've scrolled to the section
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding link
            const currentLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
}