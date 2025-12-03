<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));
    
    // Настройки получателя
    $recipient = "your-email@example.com";
    $email_subject = "Новое сообщение с портфолио: $subject";
    
    // Содержание письма
    $email_content = "Имя: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Сообщение:\n$message\n";
    
    // Заголовки письма
    $email_headers = "From: $name <$email>";
    
    // Отправка письма
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Спасибо! Ваше сообщение отправлено.";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке сообщения.";
    }
} else {
    http_response_code(403);
    echo "Ошибка при обработке запроса.";
}
?>