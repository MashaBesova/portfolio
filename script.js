// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение навигации при скролле
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.btn-submit');
    const formMessage = document.getElementById('form-message');
    
    // Валидация формы
    function validateForm() {
        let isValid = true;
        
        // Очистка предыдущих ошибок
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Валидация имени
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            document.getElementById('name-error').textContent = 'Пожалуйста, введите ваше имя';
            isValid = false;
        }
        
        // Валидация email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('email-error').textContent = 'Пожалуйста, введите ваш email';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Пожалуйста, введите корректный email';
            isValid = false;
        }
        
        // Валидация сообщения
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            document.getElementById('message-error').textContent = 'Пожалуйста, введите ваше сообщение';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Обработка отправки формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Показываем индикатор загрузки
        submitBtn.classList.add('loading');
        
        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };
        
       // Вместо setTimeout используйте fetch для отправки на сервер
fetch('your-server-endpoint.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => {
    submitBtn.classList.remove('loading');
    if (response.ok) {
        showFormMessage('Ваше сообщение успешно отправлено!', 'success');
        contactForm.reset();
    } else {
        showFormMessage('Произошла ошибка при отправке.', 'error');
    }
})
.catch(error => {
    submitBtn.classList.remove('loading');
    showFormMessage('Произошла ошибка при отправке.', 'error');
});
            
            // Для демонстрации показываем успешное сообщение
            submitBtn.classList.remove('loading');
            showFormMessage('Ваше сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
            contactForm.reset();
            
            // Сохраняем данные в localStorage для демонстрации
            saveFormData(formData);
            
        }, 1500);
    });
    
    // Функция для показа сообщения формы
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Функция для сохранения данных формы (для демонстрации)
    function saveFormData(formData) {
        // В реальном проекте данные отправляются на сервер
        // Здесь просто сохраняем в localStorage для демонстрации
        let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        console.log('Данные формы сохранены в localStorage:', formData);
        console.log('Всего отправок:', submissions.length);
    }
    
    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .skill-category, .contact-form-container, .floating-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация анимации
    document.querySelectorAll('.portfolio-item, .skill-category, .contact-form-container, .floating-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Первоначальный вызов для элементов, уже видимых при загрузке
    animateOnScroll();
});