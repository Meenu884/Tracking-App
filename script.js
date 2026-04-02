       // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const nav = document.getElementById('nav');

        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        nav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                nav.classList.remove('active');
            }
        });

        // Search form handler
        const searchForm = document.getElementById('searchForm');
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            
            if (from && to) {
                showNotification('Searching for available buses on this route...', 'info');
            } else {
                showNotification('Please select both departure and destination', 'info');
            }
        });

        // Track bus function
        function trackBus(busRoute) {
            showNotification(`Now tracking ${busRoute}! You'll receive live updates.`, 'success');
        }

        // Show notification function
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Update ETA times every 30 seconds
        function updateETAs() {
            const etaElements = document.querySelectorAll('[data-eta]');
            etaElements.forEach(element => {
                let currentETA = parseInt(element.getAttribute('data-eta'));
                if (currentETA > 1) {
                    currentETA -= 1;
                    element.setAttribute('data-eta', currentETA);
                    element.textContent = currentETA + ' min';
                } else {
                    element.textContent = 'Arriving';
                    element.className = 'stat-value eta';
                    element.style.color = '#10b981';
                }
            });
        }

        // Update ETAs every 30 seconds
        setInterval(updateETAs, 30000);

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add slide-in animation to elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                }
            });
        }, observerOptions);

        // Observe all bus cards and sections
        document.querySelectorAll('.bus-card, .schedule-table, .map-container').forEach(el => {
            observer.observe(el);
        });

        