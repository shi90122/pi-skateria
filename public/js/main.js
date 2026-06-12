document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const faders = document.querySelectorAll('.fade-in, .fade-in-up');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Reservation Form Submission
    const resForm = document.getElementById('resForm');
    const formMessage = document.getElementById('formMessage');

    resForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        // Submit to Express backend API
        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, date, time, guests })
            });

            const data = await response.json();

            if (data.success) {
                formMessage.textContent = data.message;
                formMessage.classList.remove('hidden', 'text-red-500');
                formMessage.classList.add('text-green-500');
                resForm.reset();
            }
        } catch (error) {
            formMessage.textContent = "Error connecting to the server. Please call us to reserve.";
            formMessage.classList.remove('hidden', 'text-green-500');
            formMessage.classList.add('text-red-500');
        }
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    });
});