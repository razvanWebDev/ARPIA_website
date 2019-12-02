<?php 
// $name = $_POST['name'];
// $email = $_POST['email'];
// $message = $_POST['message'];
// $formcontent="From: $name \n Message: $message";
// $recipient = "crsn_razvan@yahoo.com";
// $subject = "Contact Form";
// $mailheader = "From: $email \r\n";
// mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
// echo "Thank You!" . " -" . "<a href='contact.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";
// ;

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $mailFrom = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
}

$mailTo = "crsn_razvan@yahoo.com";
$headers = "From ARPIA website";
$txt = "You have received an email from ".$name."\n\n".$message;

mail($mailTo, $txt, $headers);
header("Location: index.html?mailsend")

?>