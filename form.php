<?php 
if(isset($_POST['email'])) {
    $email_to = "contact.arpiacluj@gmail.com, crsn_razvan@yahoo.com";
    $email_subject = "Mesaj de la website ARPIA - filiala Cluj";
     
     
    function died($error) {
        // your error code can go here
        echo "Ne pare rau, dar am am găsit erori în formular. ";
        echo "Aceste erori apar mai jos.<br /><br />";
        echo $error."<br /><br />";
        echo "Va rugăm sa corectați erorile.<br /><br />";
        die();
    }
     
    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['phone']) ||
        !isset($_POST['message'])) {
        died('Ne pare rau, dar am am găsit erori în formular.');       
    }
     
    $name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['phone']; // not required
    $comments = $_POST['message']; // required
     
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'Adresa de email nu este valida.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$name)) {
    $error_message .= 'Vă rugăm să completați numele.<br />';
  }
 
  if(strlen($comments) < 2) {
    $error_message .= 'Vă rugăm să completați mesajul.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Detaliile mesajului.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Nume: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telefon: ".clean_string($telephone)."\n";
    $email_message .= "Mesaj: ".clean_string($comments)."\n";
     
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
echo "Formularul a fost trimis cu success! <a href='contact.html' style='text-decoration:none;color:#fc9f0a;'> Înapoi</a>";


// header("Location: contact.html?mailsend")
?>

<?php
}
die();

?>