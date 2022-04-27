<?php
  session_start();
  $name = $_SESSION['name'];
  $id = $_SESSION['id'];
  $email = $_SESSION['email'];
  $phone = $_SESSION['phone'];
  if(!empty($id))
    exit(json_encode(['result'=>'success', 'userId'=>$id, 'userEmail'=>$email, 'userName'=>$name, 'userPhone'=>$phone]));
?>