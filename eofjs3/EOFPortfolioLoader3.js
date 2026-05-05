// ===== Load Portfolio from AppWrite or JSON fallback =====
async function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;

    let portfolio = [];
    let source = 'none';

    // Try AppWrite first if enabled
    if (window.appwriteService && window.appwriteService.initialized &&
        window.AppWriteConfig.features.useAppWriteForPortfolio) {
        try {
            const result = await window.appwriteService.getPortfolioItems();
            if (result.success && result.data) {
                portfolio = result.data.map(item => ({
                    id: item.$id,
                    title: item.title,
                    category: item.category,
                    description: item.description,
                    image: item.image,
                    link: item.link
                }));
                source = result.source;
            }
        } catch (error) {
            console.warn('Failed to load portfolio from AppWrite:', error);
        }
    }

    // Fallback to JSON file
    if (portfolio.length === 0) {
        try {
            const response = await fetch('portfolio.json');
            if (response.ok) {
                portfolio = await response.json();
                source = 'json';
            }
        } catch (error) {
            console.error('Error loading portfolio from JSON:', error);
        }
    }

    // Render portfolio items
    if (portfolio.length > 0) {
        portfolioGrid.innerHTML = portfolio.map(item => `
            <div class="portfolio-item" data-category="${item.category}">
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy">
                </div>
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="portfolio-link" target="_blank" rel="noopener noreferrer">Подробнее →</a>
                </div>
            </div>
        `).join('');
        console.log('Portfolio loaded from:', source);
    } else {
        portfolioGrid.innerHTML = '<p class="error">Не удалось загрузить портфолио.</p>';
    }
}

loadPortfolio();
