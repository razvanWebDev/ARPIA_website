<?php 
if(isset($_POST['email'])) {
    $email_to = "crsn_razvan@yahoo.com, contact.arpiacluj@gmail.com";
    $email_subject = "Mesaj de la website ARPIA - filiala Cluj";
    $uploadFile = $statusMsg = "";
    
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

    if(!empty($_FILES["attachment"]["name"])) {
      $targetDir = "uploads/";
        $fileName = basename($_FILES["attachment"]["name"]);
        $targetFilePath = $targetDir . $fileName;
        $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);

        if(move_uploaded_file($_FILES["attachment"]["tmp_name"], $targetFilePath)){
            $uploadedFile = $targetFilePath;
          }else{
            $uploadStatus = 0;
            $statusMsg = "Sorry, there was an error uploading your file.";
      }
    }
     
    $name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['phone']; // not required
    $message = $_POST['message']; // required
     
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'Adresa de email nu este valida.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$name)) {
    $error_message .= 'Vă rugăm să completați numele.<br />';
  }
 
  if(strlen($message) < 2) {
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
    $email_message .= "Mesaj: ".clean_string($message)."\n";



    if(!empty($uploadedFile) && file_exists($uploadedFile)){
                    
      // Boundary 
      $semi_rand = md5(time()); 
      $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x"; 
      
      // Headers for attachment 
      $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 
      
      // Multipart boundary 
      $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
      "Content-Transfer-Encoding: 7bit\n\n" . $email_message . "\n\n"; 
      
      // Preparing attachment
      if(is_file($uploadedFile)){
          $message .= "--{$mime_boundary}\n";
          $fp =    @fopen($uploadedFile,"rb");
          $data =  @fread($fp,filesize($uploadedFile));
          @fclose($fp);
          $data = chunk_split(base64_encode($data));
          $message .= "Content-Type: application/octet-stream; name=\"".basename($uploadedFile)."\"\n" . 
          "Content-Description: ".basename($uploadedFile)."\n" .
          "Content-Disposition: attachment;\n" . " filename=\"".basename($uploadedFile)."\"; size=".filesize($uploadedFile).";\n" . 
          "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
      }
      
      $message .= "--{$mime_boundary}--";
      $returnpath = "-f" . $email;
      
      // Send email
      $mail = mail($email_to, $email_subject, $message, $headers, $returnpath);
      
      // Delete attachment file from the server
      @unlink($uploadedFile);
    }else{
      // Set content-type header for sending HTML email
      $headers .= "\r\n". "MIME-Version: 1.0";
      $headers .= "\r\n". "Content-type:text/html;charset=UTF-8";
      
      // Send email
      $mail = mail($email_to, $email_subject, $email_message, $headers); 
      echo "Formularul a fost trimis cu success! <a href='contact.html' style='text-decoration:none;color:#fc9f0a;'> Înapoi</a>";
  }
     
     
// create email headers

// $headers = 'From: '.$email_from."\r\n".
// 'Reply-To: '.$email_from."\r\n" .
// 'X-Mailer: PHP/' . phpversion();
// mail($email_to, $email_subject, $email_message, $headers);  

// header("Location: contact.html?mailsend")
?>

<?php
}
die();
?>