// ===== Load Services from JSON =====
async function loadServices() {
    try {
        const response = await fetch('services.json');
        const services = await response.json();
        const servicesGrid = document.getElementById('servicesGrid');

        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card" data-service="${service.id}">
                <div class="service-image-wrapper">
                    <div class="service-image">
                        <img src="${service.image}" alt="${service.title}" class="service-img" onerror="this.style.display='none'">
                    </div>
                </div>
                <div class="service-content">
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-desc">${service.description}</p>
                    <div class="service-tags">
                        ${service.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

loadServices();
