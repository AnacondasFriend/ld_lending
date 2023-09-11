<?php
  // The global $_POST variable allows you to access the data sent with the POST method by name
  // To access the data sent with the GET method, you can use $_GET
  $name = htmlspecialchars($_POST['name']);
  $tel  = htmlspecialchars($_POST['phonenumber']);
  $email  = htmlspecialchars($_POST['email']);

  echo  $name, ' ', $tel, ' ', $email;
?>
