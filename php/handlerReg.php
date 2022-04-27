<?php
    session_start();
    $mysqli = new mysqli('ppochtpl.beget.tech', 'ppochtpl_antonin', '4cIu&t%M', 'ppochtpl_antonin');
    $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $pass = $_POST['pass'];
    $githubid = $_POST['githubid'];
    $githublogin = $_POST['githublogin'];
    // check empty inputs
    if(empty($email) or empty($name) or empty($phone) or empty($pass)) exit(json_encode(['result'=>'input_empty']));
    $email = mb_strtolower($email);
    $r = $mysqli->query("SELECT * FROM users WHERE email='$email'");
    if($r->num_rows) exit(json_encode(['result'=>'exist']));
    $pass = password_hash($pass, PASSWORD_DEFAULT);
    if(!empty($githubid) and !empty($githublogin)){
      $mysqli->query("INSERT INTO `users`(`email`, `pass`, `name`, `phone`, `githubid`, `githublogin`) VALUES ('$email', '$pass', '$name', '$phone', '$githubid', '$githublogin')");
    }else{
      $mysqli->query("INSERT INTO `users`(`email`, `pass`, `name`, `phone`) VALUES ('$email', '$pass', '$name', '$phone')");
    }
    echo json_encode(['result'=>'success']);
?>