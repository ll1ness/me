// ===== Portfolio Filter =====
document.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.querySelector('.portfolio-filters');
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (!filterContainer || !portfolioGrid) return;
    
    filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        
        const btn = e.target;
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        const items = portfolioGrid.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});
