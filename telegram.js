exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    try {
        const data = JSON.parse(event.body);
        const BOT_TOKEN = process.env.'7979859669:AAH2x1nPJwBfD3tDZb-ODCU4xQFiEsXLYv8';
        const CHAT_ID = process.env.'@Forms12345_site12345_bot';
        
        const message = "📨 Новое сообщение\nИмя: ${data.name}\nEmail: ${data.email}\nТема: ${data.subject}\n\n${data.message};"
        
        const response = await fetch (https://api.telegram.org/bot${7979859669:AAH2x1nPJwBfD3tDZb-ODCU4xQFiEsXLYv8}/sendMessage), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: '@Forms12345_site12345_bot',
                text: message
            })
        };
        
        const result = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ success: result.ok })
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};