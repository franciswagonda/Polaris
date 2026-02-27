document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('navLinks');

    if (!toggle || !nav) return;

    // Toggle nav on small screens
    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (!nav.classList.contains('open')) return;
        const target = e.target;
        if (!nav.contains(target) && !toggle.contains(target)) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Ensure nav is visible on larger screens after resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            nav.style.display = '';
        }
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Send form data to Formspree
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success modal
                    showModal();
                    // Reset form
                    contactForm.reset();
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            });
        });
    }
});

// Modal functions
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}
