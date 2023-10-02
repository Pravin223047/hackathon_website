<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fname = isset($_POST['fname']) ? htmlspecialchars($_POST['fname']) : '';
    $lname = isset($_POST['lname']) ? htmlspecialchars($_POST['lname']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $number = isset($_POST['number']) ? htmlspecialchars($_POST['number']) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

    if (!empty($email) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $recipient_email = filter_var($email, FILTER_SANITIZE_EMAIL);
            $sender_name = "HydroVision";
            $sender_address = "kshirsagarpravin.1111@gmail.com";
            $subject = "Message from $fname $lname";

            $html_body = "<p>$message</p>";

            $headers = "From: $sender_name <$sender_address>\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

            if (mail($recipient_email, $subject, $html_body, $headers)) {
                $success = "Your message has been successfully sent";
                echo $success;
            } else {
                $error = 'Something went wrong while sending the email.';
                echo $error;
                error_log('Email delivery failed for ' . $recipient_email);
            }
        } else {
            $error = "Enter a valid email address!";
            echo $error;
        }
    } else {
        $error = "Email and Message fields are required!";
        echo $error;
    }
}
?>