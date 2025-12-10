// ============================================
// script.js - РАБОЧИЙ КОД ДЛЯ ОТПРАВКИ В TELEGRAM
// Адаптировано из рабочего примера
// ============================================

(function() {
    'use strict';
    
    console.log('🚀 Запускаем отправку формы в Telegram...');
    
    // ============================================
    // ВАШИ ДАННЫЕ - ЗАМЕНИТЕ ЭТО!
    // ============================================
    
    const BOT_TOKEN = '7979859669:AAH2x1nPJwBfD3tDZb-ODCU4xQFiEsXLYv8';
    const CHAT_ID = '2141984414';
    
    // ============================================
    // ОБЪЕКТ ДЛЯ ХРАНЕНИЯ ЗНАЧЕНИЙ ФОРМЫ
    // ============================================
    
    const formValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };
    
    // ============================================
    // ИНИЦИАЛИЗАЦИЯ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
    // ============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ Страница портфолио загружена');
        
        // Ждем немного для полной инициализации
        setTimeout(initializeForm, 500);
        
        // Настройка других элементов страницы
        setupMobileMenu();
        setupSmoothScroll();
        setupCurrentYear();
    });
    
    function initializeForm() {
        console.log('🎯 Инициализирую форму обратной связи...');
        
        // Находим кнопку отправки формы
        const sendButton = document.querySelector('.btn-submit') || 
                          document.querySelector('button[type="submit"]') ||
                          document.querySelector('.btn-primary');
        
        if (!sendButton) {
            console.error('❌ Кнопка отправки не найдена');
            console.log('Ищу кнопку с классами: btn-submit, btn-primary, или button[type="submit"]');
            return;
        }
        
        console.log('✅ Кнопка найдена:', sendButton);
        
        // Находим поля формы
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        console.log('📝 Проверяю поля формы:');
        console.log('Поле имени (name):', nameField);
        console.log('Поле email (email):', emailField);
        console.log('Поле темы (subject):', subjectField);
        console.log('Поле сообщения (message):', messageField);
        
        // Сохраняем ссылки на поля в глобальный объект для отладки
        window.formFields = { 
            nameField, 
            emailField, 
            subjectField, 
            messageField,
            sendButton 
        };
        
        // Добавляем обработчики изменения для каждого поля
        if (nameField) {
            nameField.addEventListener('input', function(e) {
                formValues.name = e.target.value;
                console.log('Имя изменено:', formValues.name);
            });
        }
        
        if (emailField) {
            emailField.addEventListener('input', function(e) {
                formValues.email = e.target.value;
                console.log('Email изменен:', formValues.email);
            });
        }
        
        if (subjectField) {
            subjectField.addEventListener('input', function(e) {
                formValues.subject = e.target.value;
                console.log('Тема изменена:', formValues.subject);
            });
        }
        
        if (messageField) {
            messageField.addEventListener('input', function(e) {
                formValues.message = e.target.value;
                console.log('Сообщение изменено:', formValues.message);
            });
        }
        
        // Удаляем все старые обработчики с кнопки и добавляем новый
        const newButton = sendButton.cloneNode(true);
        sendButton.parentNode.replaceChild(newButton, sendButton);
        
        // Добавляем обработчик отправки формы
        newButton.addEventListener('click', handleFormSubmit);
        
        // Также вешаем обработчик на саму форму
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit(e);
            });
        }
        
        // Создаем тестовую кнопку
        createTestButton();
        
        console.log('✅ Форма обратной связи инициализирована');
        console.log('Текущие значения формы:', formValues);
    }
    
    // ============================================
    // ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ
    // ============================================
    
    function handleFormSubmit(event) {
        console.log('🎯 Событие отправки формы поймано!');
        
        event.preventDefault();
        event.stopPropagation();
        
        // Получаем значения из объекта formValues
        const name = formValues.name || '';
        const email = formValues.email || '';
        const subject = formValues.subject || '';
        const message = formValues.message || '';
        
        console.log('📋 Данные из formValues:', { name, email, subject, message });
        
        // Альтернативно: получаем значения напрямую из полей
        const nameField = window.formFields?.nameField || document.getElementById('name');
        const emailField = window.formFields?.emailField || document.getElementById('email');
        const subjectField = window.formFields?.subjectField || document.getElementById('subject');
        const messageField = window.formFields?.messageField || document.getElementById('message');
        
        const directName = nameField?.value || '';
        const directEmail = emailField?.value || '';
        const directSubject = subjectField?.value || '';
        const directMessage = messageField?.value || '';
        
        console.log('📋 Данные напрямую из полей:', { 
            directName, 
            directEmail, 
            directSubject, 
            directMessage 
        });
        
        // Используем оба метода для надежности
        const finalName = name || directName;
        const finalEmail = email || directEmail;
        const finalSubject = subject || directSubject || 'Без темы';
        const finalMessage = message || directMessage;
        
        console.log('📋 Финальные данные для отправки:', { 
            finalName, 
            finalEmail, 
            finalSubject, 
            finalMessage 
        });
        
        // ============================================
        // ПРОВЕРКА ЗАПОЛНЕНИЯ ПОЛЕЙ
        // ============================================
        
        if (!finalName.trim()) {
            alert('Пожалуйста, введите ваше имя');
            showError('name-error', 'Пожалуйста, введите ваше имя');
            return;
        }
        
        if (!finalEmail.trim()) {
            alert('Пожалуйста, введите ваш email');
            showError('email-error', 'Пожалуйста, введите ваш email');
            return;
        }
        
        // Проверка формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(finalEmail)) {
            alert('Пожалуйста, введите корректный email адрес (например: name@example.com)');
            showError('email-error', 'Пожалуйста, введите корректный email');
            return;
        }
        
        if (!finalMessage.trim()) {
            alert('Пожалуйста, введите ваше сообщение');
            showError('message-error', 'Пожалуйста, введите ваше сообщение');
            return;
        }
        
        // ============================================
        // ОТПРАВКА В TELEGRAM
        // ============================================
        
        sendToTelegram(finalName, finalEmail, finalSubject, finalMessage);
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            setTimeout(() => {
                errorElement.textContent = '';
            }, 3000);
        }
    }
    
    // ============================================
    // ФУНКЦИЯ ОТПРАВКИ В TELEGRAM
    // ============================================
    
    function sendToTelegram(name, email, subject, message) {
        // Формируем сообщение для Telegram
        const telegramMessage = `📨 НОВОЕ СООБЩЕНИЕ С ПОРТФОЛИО UX/UI ДИЗАЙНЕРА\n\n` +
                               `👤 Имя: ${name}\n` +
                               `📧 Email: ${email}\n` +
                               `📝 Тема: ${subject}\n\n` +
                               `💬 Сообщение:\n${message}\n\n` +
                               `⏰ Время: ${new Date().toLocaleString('ru-RU')}\n` +
                               `🌐 Сайт: ${window.location.href}`;
        
        console.log('📤 Отправляю сообщение в Telegram:', telegramMessage);
        
        // Находим кнопку отправки
        const button = window.formFields?.sendButton || 
                      document.querySelector('.btn-submit') || 
                      document.querySelector('button[type="submit"]');
        
        // Показываем загрузку
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        button.disabled = true;
        
        // ============================================
        // МЕТОД 1: Используем FormData (надежнее)
        // ============================================
        
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('text', telegramMessage);
        
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('✅ Ответ от Telegram:', data);
            
            if (data.ok) {
                // Успешная отправка
                showSuccessMessage();
                clearForm();
            } else {
                // Ошибка от Telegram API
                console.error('❌ Ошибка Telegram:', data.description);
                showErrorMessage(data.description || 'Ошибка отправки сообщения');
            }
        })
        .catch(error => {
            // Сетевая ошибка
            console.error('❌ Сетевая ошибка:', error);
            showErrorMessage('Произошла ошибка сети. Пожалуйста, попробуйте еще раз.');
            
            // Сохраняем сообщение локально
            saveMessageLocally(name, email, subject, message);
        })
        .finally(() => {
            // Восстанавливаем кнопку
            button.innerHTML = originalText;
            button.disabled = false;
        });
    }
    
    // ============================================
    // ФУНКЦИИ ДЛЯ ОТОБРАЖЕНИЯ РЕЗУЛЬТАТОВ
    // ============================================
    
    function showSuccessMessage() {
        // Используем существующее сообщение формы или создаем новое
        const formMessage = document.getElementById('form-message');
        
        if (formMessage) {
            formMessage.textContent = '✅ Ваше сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Скрываем через 5 секунд
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            // Создаем временное уведомление
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <div style="padding: 15px; background: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 5px; margin: 10px 0;">
                    ✅ Сообщение отправлено! Я свяжусь с вами в ближайшее время.
                </div>
            `;
            
            const form = document.getElementById('contact-form');
            if (form) {
                form.parentNode.insertBefore(notification, form);
                
                setTimeout(() => {
                    notification.remove();
                }, 5000);
            } else {
                alert('✅ Сообщение отправлено! Спасибо!');
            }
        }
        
        // Также показываем всплывающее окно
        alert('✅ Сообщение успешно отправлено! Проверьте Telegram.');
    }
    
    function showErrorMessage(errorText) {
        const formMessage = document.getElementById('form-message');
        
        if (formMessage) {
            formMessage.textContent = '❌ ' + errorText;
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            alert('❌ Ошибка: ' + errorText);
        }
    }
    
    function clearForm() {
        // Очищаем объект значений
        formValues.name = '';
        formValues.email = '';
        formValues.subject = '';
        formValues.message = '';
        
        // Очищаем поля ввода
        const nameField = window.formFields?.nameField || document.getElementById('name');
        const emailField = window.formFields?.emailField || document.getElementById('email');
        const subjectField = window.formFields?.subjectField || document.getElementById('subject');
        const messageField = window.formFields?.messageField || document.getElementById('message');
        
        if (nameField) nameField.value = '';
        if (emailField) emailField.value = '';
        if (subjectField) subjectField.value = '';
        if (messageField) messageField.value = '';
        
        // Очищаем ошибки
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
    }
    
    // ============================================
    // СОХРАНЕНИЕ СООБЩЕНИЯ ЛОКАЛЬНО (ЗАПАСНОЙ ВАРИАНТ)
    // ============================================
    
    function saveMessageLocally(name, email, subject, message) {
        try {
            const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            const newMessage = {
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString(),
                savedLocally: true
            };
            
            messages.push(newMessage);
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));
            
            console.log('💾 Сообщение сохранено локально:', newMessage);
            console.log('📊 Всего сохранено сообщений:', messages.length);
            
            // Показываем уведомление
            const formMessage = document.getElementById('form-message');
            if (formMessage) {
                formMessage.textContent = '⚠️ Сообщение сохранено локально (ошибка сети)';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
            
        } catch (error) {
            console.error('❌ Ошибка при сохранении локально:', error);
        }
    }
    
    // ============================================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ СТРАНИЦЫ
    // ============================================
    
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Закрываем меню при клике на ссылку
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    function setupSmoothScroll() {
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
    }
    
    function setupCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // ============================================
    // ФУНКЦИИ ДЛЯ ОТЛАДКИ
    // ============================================
    
    // Функция для отладки формы (вызовите в консоли: debugForm())
    window.debugForm = function() {
        console.log('=== ОТЛАДКА ФОРМЫ ПОРТФОЛИО ===');
        console.log('Текущие значения formValues:', formValues);
        console.log('Поля формы:');
        console.log('name:', document.getElementById('name')?.value);
        console.log('email:', document.getElementById('email')?.value);
        console.log('subject:', document.getElementById('subject')?.value);
        console.log('message:', document.getElementById('message')?.value);
        console.log('BOT_TOKEN:', BOT_TOKEN);
        console.log('CHAT_ID:', CHAT_ID);
        console.log('window.formFields:', window.formFields);
        
        // Проверка данных
        if (BOT_TOKEN.includes('ВСТАВЬТЕ')) {
            console.error('❌ BOT_TOKEN не настроен! Замените на ваш токен');
        }
        
        if (CHAT_ID.includes('ВСТАВЬТЕ')) {
            console.error('❌ CHAT_ID не настроен! Замените на ваш Chat ID');
        }
    };
    
    // Функция для отправки тестового сообщения
    window.sendTestMessage = function() {
        if (BOT_TOKEN.includes('ВСТАВЬТЕ') || CHAT_ID.includes('ВСТАВЬТЕ')) {
            alert('Сначала настройте BOT_TOKEN и CHAT_ID!');
            return;
        }
        
        sendToTelegram(
            'Тестовое Имя',
            'test@example.com',
            'Тестовая тема',
            'Это тестовое сообщение для проверки отправки в Telegram.'
        );
    };
    
    // Показываем сохраненные сообщения
    window.showSavedMessages = function() {
        const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        console.log('💾 Сохраненные сообщения:', messages);
        
        if (messages.length === 0) {
            alert('Нет сохраненных сообщений');
        } else {
            alert(`Сохранено ${messages.length} сообщений. Откройте консоль (F12) чтобы посмотреть.`);
        }
        
        return messages;
    };
    
    console.log('✅ Script.js успешно загружен и готов к работе!');
    console.log('📝 Для отладки вызовите в консоли: debugForm()');
    console.log('🧪 Для теста вызовите: sendTestMessage()');
    
})();


