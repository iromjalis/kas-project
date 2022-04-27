<?php
    session_start();
    $mysqli = new mysqli('ppochtpl.beget.tech', 'ppochtpl_antonin', '4cIu&t%M', 'ppochtpl_antonin');
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    if(empty($email) or empty($pass)) exit(json_encode(['result'=>'input_empty']));
    $email = mb_strtolower($email);
    $r = $mysqli->query("SELECT * FROM users WHERE email='$email'");
    $result = $r->fetch_assoc();
    if(password_verify($pass, $result['pass'])){
        $_SESSION['name'] = $result['name'];
        $_SESSION['id'] = $result['id'];
        $_SESSION['email'] = $result['email'];
        $_SESSION['phone'] = $result['phone'];
        echo json_encode(['result'=>'success']);
    }else{
        echo json_encode(['result'=>'error']);
    }
?>
