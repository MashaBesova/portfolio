// ============================================
// ФАЙЛ: script.js
// ПОЛНОСТЬЮ ПРОВЕРЕННЫЙ РАБОЧИЙ КОД
// ============================================

// ВАШИ ДАННЫЕ - ЗАМЕНИТЕ ТОЛЬКО ЭТИ ДВЕ СТРОКИ!
const BOT_TOKEN = '6123456789:AAEyC5q-3e7f8g9h0i1j2k3l4m5n6o7p8q9r';
const CHAT_ID = '2141984414';

// Ждем когда страница полностью загрузится
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Проверка данных
    if (BOT_TOKEN === '6123456789:AAEyC5q-3e7f8g9h0i1j2k3l4m5n6o7p8q9r' || 
        CHAT_ID === '2141984414' ||
        BOT_TOKEN.includes('ВСТАВЬТЕ')) {
        console.error('ЗАМЕНИТЕ BOT_TOKEN и CHAT_ID на ваши данные!');
        alert('ВАЖНО: Замените BOT_TOKEN и CHAT_ID на ваши данные в файле script.js');
    }
    
    // Находим форму
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Форма не найдена! Убедитесь что в HTML есть id="contact-form"');
        return;
    }
    
    console.log('Форма найдена');
    
    // Обработчик отправки формы
    form.addEventListener('submit', async function(event) {
        // Останавливаем стандартную отправку формы
        event.preventDefault();
        
        console.log('Форма отправляется...');
        
        // Получаем значения полей
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value || 'Без темы';
        const message = document.getElementById('message').value;
        
        // Простая проверка
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Меняем текст кнопки
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Отправка...';
        submitButton.disabled = true;
        
        try {
            // Формируем сообщение для Telegram
            const telegramMessage = 
                'НОВОЕ СООБЩЕНИЕ С САЙТА\n\n' +
                'Имя: ' + name + '\n' +
                'Email: ' + email + '\n' +
                'Тема: ' + subject + '\n\n' +
                'Сообщение:\n' + message + '\n\n' +
                'Время: ' + new Date().toLocaleString();
            
            console.log('Отправляю сообщение в Telegram:', telegramMessage);
            
            // Отправляем запрос к Telegram API
            const response = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramMessage
                })
            });
            
            // Получаем ответ
            const result = await response.json();
            console.log('Ответ от Telegram:', result);
            
            // Проверяем результат
            if (result.ok) {
                // Успешно!
                alert('✅ Сообщение отправлено! Проверьте Telegram.');
                form.reset(); // Очищаем форму
            } else {
                // Ошибка от Telegram
                alert('❌ Ошибка: ' + result.description);
                console.error('Telegram error:', result);
            }
            
        } catch (error) {
            // Ошибка сети или другая ошибка
            console.error('Ошибка при отправке:', error);
            alert('❌ Ошибка сети. Попробуйте еще раз.');
        } finally {
            // Восстанавливаем кнопку
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Создаем тестовую кнопку
    createTestButton();
    
    // Плавная прокрутка для ссылок
    setupSmoothScroll();
    
    // Мобильное меню
    setupMobileMenu();
});

// Создаем кнопку для тестирования Telegram
function createTestButton() {
    const testButton = document.createElement('button');
    testButton.id = 'test-telegram-button';
    testButton.innerHTML = '🧪 Тест Telegram';
    testButton.style.cssText = `
        display: block;
        margin: 20px auto;
        padding: 12px 24px;
        background-color: #6C63FF;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
    `;
    
    testButton.onclick = async function() {
        this.disabled = true;
        this.innerHTML = 'Тестирую...';
        
        try {
            const response = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: '🧪 Тестовое сообщение с сайта портфолио! Если вы это видите - все работает! ✅'
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                alert('✅ Тест пройден! Сообщение отправлено в Telegram.');
                console.log('Тест успешен:', result);
            } else {
                alert('❌ Ошибка: ' + result.description);
                console.error('Тест не пройден:', result);
            }
            
        } catch (error) {
            alert('❌ Сетевая ошибка: ' + error.message);
            console.error('Ошибка при тесте:', error);
        } finally {
            this.disabled = false;
            this.innerHTML = '🧪 Тест Telegram';
        }
    };
    
    // Добавляем кнопку после формы
    const form = document.getElementById('contact-form');
    if (form && form.parentNode) {
        form.parentNode.appendChild(testButton);
    }
}

// Настройка плавной прокрутки
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

// Настройка мобильного меню
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

// Изменение навигации при скролле
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

// Устанавливаем текущий год в футере
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
