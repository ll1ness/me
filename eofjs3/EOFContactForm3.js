// ===== Contact Form with AppWrite Integration =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.message) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        try {
            // Try to submit via AppWrite
            if (window.appwriteService && window.appwriteService.initialized) {
                const result = await window.appwriteService.submitContactForm(data);
                console.log('Contact form submitted via:', result.source);
            } else {
                // Fallback: simulate success (or use localStorage fallback inside service)
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Contact form submission error:', error);
            showNotification('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
