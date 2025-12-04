
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Сайт портфолио загружен!');
    
    // ============================================
    // ШАГ 1: ВСТАВЬТЕ ВАШИ ДАННЫЕ ЗДЕСЬ!
    // ============================================
    
    const BOT_TOKEN = '7979859669:AAH2x1nPJwBfD3tDZb-ODCU4xQFiEsXLYv8';

    const CHAT_ID = '2141984414';
    
    // ============================================
    // ШАГ 2: ПРОВЕРКА ДАННЫХ ПРИ ЗАГРУЗКЕ
    // ============================================
    
    console.log('Проверяю настройки Telegram...');
    console.log('BOT_TOKEN:', BOT_TOKEN ? '✅ Установлен' : '❌ Не установлен');
    console.log('CHAT_ID:', CHAT_ID ? '✅ Установлен' : '❌ Не установлен');
    
    if (BOT_TOKEN.includes('ВСТАВЬТЕ') || CHAT_ID.includes('ВСТАВЬТЕ')) {
        console.error('❌ ОШИБКА: Вы забыли вставить ваши данные!');
        console.error('1. Получите токен у @BotFather');
        console.error('2. Получите Chat ID у @userinfobot');
        console.error('3. Вставьте их в строки 12 и 15 этого файла');
    }
    
    // ============================================
    // 1. МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР)
    // ============================================
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Клик по гамбургеру
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Клик по ссылке в меню
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // 2. ПЛАВНАЯ ПРОКРУТКА
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            
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
    
    // ============================================
    // 3. ИЗМЕНЕНИЕ НАВИГАЦИИ ПРИ СКРОЛЛЕ
    // ============================================
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.padding = '15px 0';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = '20px 0';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        }
    });
    
    // ============================================
    // 4. ФОРМА ОБРАТНОЙ СВЯЗИ - ОТПРАВКА В TELEGRAM
    // ============================================
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {console.log('✅ Форма обратной связи найдена');
        
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Останавливаем стандартную отправку
            
            console.log('🔄 Начинаю отправку формы...');
            
            // ============================================
            // 4.1. ПОЛУЧАЕМ ДАННЫЕ ИЗ ФОРМЫ
            // ============================================
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim() || 'Без темы';
            const message = document.getElementById('message').value.trim();
            
            console.log('Данные формы:', { name, email, subject, message });
            
            // ============================================
            // 4.2. ПРОВЕРКА (ВАЛИДАЦИЯ)
            // ============================================
            
            let hasError = false;
            
            // Очищаем старые ошибки
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Проверка имени
            if (!name) {
                document.getElementById('name-error').textContent = 'Пожалуйста, введите ваше имя';
                hasError = true;
            }
            
            // Проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                document.getElementById('email-error').textContent = 'Пожалуйста, введите email';
                hasError = true;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Пожалуйста, введите правильный email';
                hasError = true;
            }
            
            // Проверка сообщения
            if (!message) {
                document.getElementById('message-error').textContent = 'Пожалуйста, введите сообщение';
                hasError = true;
            }
            
            if (hasError) {
                console.log('❌ Ошибки в форме');
                return;
            }
            
            // ============================================
            // 4.3. ПОДГОТОВКА К ОТПРАВКЕ
            // ============================================
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            // Показываем загрузку
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // ============================================
            // 4.4. ФОРМИРУЕМ СООБЩЕНИЕ ДЛЯ TELEGRAM
            // ============================================
            
            const telegramMessage = 
                📨 НОВОЕ СООБЩЕНИЕ С САЙТА-ПОРТФОЛИО\n\n +
                👤 Имя: ${name}\n +
                📧 Email: ${email}\n +
                📝 Тема: ${subject}\n\n +
                💬 Сообщение:\n${message}\n\n +
                ⏰ Время: ${new Date().toLocaleString('ru-RU')}\n +
                🌐 Сайт: ${window.location.href};
            
            console.log('Сообщение для Telegram:', telegramMessage);
            
            // ============================================
            // 4.5. ОТПРАВКА В TELEGRAM
            // ============================================
            
            try {
                console.log('🔄 Отправляю запрос в Telegram...');
                
                // Отправляем запрос к API Telegram
                const response = await fetch(
                    https://api.telegram.org/bot${BOT_TOKEN}/sendMessage,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: CHAT_ID,
                            text: telegramMessage,
                            parse_mode: 'HTML'
                        })
                    }
                );
                
                const result = await response.json();
                console.log('Ответ от Telegram:', result);
                
                // ============================================
                // 4.6. ОБРАБОТКА ОТВЕТА ОТ TELEGRAM
                // ============================================
                
                if (result.ok) {
                    // УСПЕХ! Сообщение отправлено
                    console.log('✅ Сообщение успешно отправлено в Telegram!');
                    
                    // Показываем сообщение об успехе
                    showFormMessage(
                        '✅ Ваше сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.',
                        'success'
                    );
                    
                    // Очищаем форму
                    contactForm.reset();
                    
                    // Показываем всплывающее уведомление
                    showNotification('Сообщение отправлено! Проверьте Telegram.', 'success');
                    
                } else {
                    // ОШИБКА от Telegram API
                    console.error('❌ Ошибка Telegram:', result.description);
                    
                    let errorMessage = 'Ошибка при отправке. ';
                    
                    if (result.description.includes('chat not found')) {
                        errorMessage += 'Неправильный Chat ID. Проверьте Chat ID.';
                    } else if (result.description.includes('Unauthorized')) {
                        errorMessage += 'Неправильный токен бота. Проверьте токен.';
                    } else {
                        errorMessage += result.description;
                    }
                    
                    showFormMessage('❌ ' + errorMessage, 'error');
                    showNotification('Ошибка отправки', 'error');
                }
                
            } catch (error) {
                // ОШИБКА СЕТИ ИЛИ ДРУГАЯ ОШИБКА
                console.error('❌ Сетевая ошибка:', error);
                
                showFormMessage(
                    '❌ Ошибка сети. Проверьте подключение к интернету и попробуйте еще раз.',
                    'error'
                );
                
                // Сохраняем сообщение локально (запасной вариант)
                saveMessageLocally({ name, email, subject, message });
                
                showNotification('Сообщение сохранено локально', 'info');
                
            } finally {
                // ============================================
                // 4.7. ВОЗВРАЩАЕМ КНОПКУ В ИСХОДНОЕ СОСТОЯНИЕ
                // ============================================
                
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            }
        });
    } else {
        console.error('❌ Форма обратной связи не найдена!');
    }
    
    // ============================================
    // 5. ТЕСТОВАЯ КНОПКА ДЛЯ ПРОВЕРКИ TELEGRAM
    // ============================================
    
    // Создаем тестовую кнопку, если ее нет
    if (!document.getElementById('test-telegram-btn')) {
        const testBtn = document.createElement('button');
        testBtn.id = 'test-telegram-btn';
        testBtn.className = 'btn btn-secondary';
        testBtn.style.cssText = 'margin: 20px auto; display: block;';
        testBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Тест отправки в Telegram';
        testBtn.title = 'Нажмите чтобы проверить отправку в Telegram';
        
        if (contactForm) {
            contactForm.parentNode.appendChild(testBtn);
        }
    }
    
    // Обработчик для тестовой кнопки
    document.getElementById('test-telegram-btn')?.addEventListener('click', async function() {
        console.log('🧪 Тестирую отправку в Telegram...');
        
        if (!BOT_TOKEN || BOT_TOKEN.includes('ВСТАВЬТЕ')) {
            alert('❌ Сначала вставьте ваш токен бота в код!');
            return;
        }
        
        if (!CHAT_ID || CHAT_ID.includes('ВСТАВЬТЕ')) {
            alert('❌ Сначала вставьте ваш Chat ID в код!');
            return;
        }
        
        const testMessage = 
            🧪 ТЕСТОВОЕ СООБЩЕНИЕ\n\n +
            Это тестовое сообщение от сайта портфолио.\n +
            Если вы это видите, значит отправка работает!\n\n +
            ⏰ Время: ${new Date().toLocaleString('ru-RU')}\n +
            ✅ Все настроено правильно!;
        
        try {
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Тестирую...';
            
            const response = await fetch(
                https://api.telegram.org/bot${BOT_TOKEN}/sendMessage,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: testMessage
                    })
                }
            );
            
            const result = await response.json();
            
            if (result.ok) {
                alert('✅ Тест успешен! Проверьте Telegram, должно прийти сообщение.');
                console.log('✅ Тест пройден! Ответ Telegram:', result);
            } else {
                alert('❌ Ошибка: ' + result.description);
                console.error('❌ Тест не пройден:', result);
            }
            
        } catch (error) {
            alert('❌ Сетевая ошибка: ' + error.message);
            console.error('❌ Ошибка при тесте:', error);
            
        } finally {
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-paper-plane"></i> Тест отправки в Telegram';
        }
    });
    
    // ============================================
    // 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    // ============================================
    
    /**
     * Показывает сообщение над формой
     */
    function showFormMessage(text, type) {
        const formMessage = document.getElementById('form-message');
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = form-message ${type};
        formMessage.style.display = 'block';
        
        // Скрываем через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    /**
     * Показывает всплывающее уведомление
     */
    function showNotification(text, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = notification notification-${type};
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${text}</span>
                </div>
            <button class="notification-close">&times;</button>
        ;
        
        // Добавляем стили если их нет
        addNotificationStyles();
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Закрытие по клику на крестик
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    /**
     * Возвращает иконку для типа уведомления
     */
    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }
    
    /**
     * Добавляет стили для уведомлений
     */
    function addNotificationStyles() {
        if (document.getElementById('notification-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = 
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-left: 4px solid #6C63FF;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border-radius: 8px;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            }
            .notification-success {
                border-left-color: #4CAF50;
            }
            .notification-error {
                border-left-color: #f44336;
            }
            .notification-warning {
                border-left-color: #ff9800;
            }
            .notification-info {
                border-left-color: #2196F3;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            .notification-content i {
                font-size: 20px;
            }
            .notification-success .notification-content i {
                color: #4CAF50;
            }
            .notification-error .notification-content i {
                color: #f44336;
            }
            .notification-warning .notification-content i {
                color: #ff9800;
            }
            .notification-info .notification-content i {
                color: #2196F3;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #666;
                margin-left: 10px;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s;
            }
            .notification-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
                }
            @media (max-width: 576px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Сохраняет сообщение локально (запасной вариант)
     */
    function saveMessageLocally(formData) {
        try {
            const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            formData.timestamp = new Date().toISOString();
            messages.push(formData);
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));
            
            console.log('💾 Сообщение сохранено локально:', formData);
            console.log('📊 Всего сохранено сообщений:', messages.length);
            
        } catch (error) {
            console.error('




