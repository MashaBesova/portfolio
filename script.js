async function sendToTelegram(formData) {
    // Используйте этот URL (это мой тестовый прокси, замените на свой)
    const proxyUrl = 'https://portfolio-topaz-six-98.vercel.app/';
    
    try {
        const response = await fetch(googleScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}
