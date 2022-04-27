<?php
if (!empty($_GET['code'])) {
	$params = array(
		'client_id'     => '02d64ec29c645abfe088',
		'client_secret' => '28a07d3ad989af63b37c12fdb8f796bb357899a2',
		'redirect_uri'  => 'http://ppochtpl.beget.tech/oauth-githud.php',
		'code'          => $_GET['code']
	);	
			
	$ch = curl_init('https://github.com/login/oauth/access_token');
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, urldecode(http_build_query($params))); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_HEADER, false);
	$data = curl_exec($ch);
	curl_close($ch);	
	parse_str($data, $data);
  $info = [];
	if (!empty($data['access_token'])) {
		$ch = curl_init('https://api.github.com/user');
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: token ' . $data['access_token']));
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$info = curl_exec($ch);
		curl_close($ch);
		$info = json_decode($info, true);
	}
	$gitHubLogin = $info['login'];
	$gitHubId = $info['id'];
	$mysqli = new mysqli('ppochtpl.beget.tech', 'ppochtpl_antonin', '4cIu&t%M', 'ppochtpl_antonin');
	$r = $mysqli->query("SELECT * FROM `users` WHERE githubid = '$gitHubId' AND githublogin='$gitHubLogin'");
	session_start();
	if($r->num_rows){
	  $result = $r->fetch_assoc();
	  $_SESSION['name'] = $result['name'];
    $_SESSION['id'] = $result['id'];
    $_SESSION['email'] = $result['email'];
    $_SESSION['phone'] = $result['phone'];
    header("Location: /profile.html");
	}
}else{
  exit("<h1>Auth error, redirect to sign in 3 sec...</h1><script>setTimeout(()=>{location.href = '/auth.html'}, 3000)</script>");
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet"/>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/1.0.0/modern-normalize.min.css"
    />
    <link rel="stylesheet" href="./css/container.css" />
    <link rel="stylesheet" href="./css/normalize.css" />
    <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>
  <header class="header container">
      <a href="/" target="_blank" rel="noopener noreferrer" class="logo">
        <img src="./images/Logo.png" alt="logo icon" width="16" height="16" />
        Logo
      </a>

      <!-- Burger menu -->
      <button
        type="button"
        class="menu-button"
        aria-expanded="false"
        aria-controls="menu"
      >
        <svg
          class="burger-menu"
          data-menu-button
          width="24"
          height="18"
          aria-label="Menu switcher"
        >
          <use
            class="icon-menu"
            width="24"
            height="16"
            href="./images/SVG/sprite.svg#icon-menu"
          ></use>
          <use
            class="icon-cross"
            width="18"
            height="18"
            href="./images/SVG/sprite.svg#icon-close"
          ></use>
        </svg>
      </button>

      <nav>
        <ul class="site-nav">
          <li>
            <a
              href="http://"
              class="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              >Search</a
            >
          </li>
          <li>
            <a
              href="http://"
              class="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              >My events</a
            >
          </li>
          <li>
            <a
              href="http://"
              class="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              >About</a
            >
          </li>
          <li>
            <a
              href="http://"
              class="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              >Contact us</a
            >
          </li>
        </ul>
      </nav>
      <div class="signIn-wrapper">
        <a href="/auth.html" type="button" class="signIn-btn btn">Sign in</a>
        <a
          class="icon-person"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer Nofollow"
        >
          <svg class="icon-person-svg" width="20" height="20">
            <use href="./images/SVG/symbol-defs.svg#icon-person"></use>
          </svg>
        </a>
      </div>
    </header>
    <div class="container">
        <h3 class="text-center my-5">Registration</h3>
        <div class="col-sm-5 mx-auto">
            <p>GitHub login: <?= $info['login']; ?></p>
            <p>Please provide missing information</p>
            <form onsubmit="sendForm(this); return false;">
                <div class="mb-3">
                    <input name="email" type="email" class="form-control" placeholder="E-mail">
                </div>
                <div class="mb-3">
                    <input name="name" type="text" class="form-control" placeholder="Name">
                </div>
                <div class="mb-3">
                    <input name="phone" type="tel" class="form-control" placeholder="Phone">
                </div>
                <div class="mb-3">
                    <input name="pass" type="password" class="form-control" placeholder="Password">
                    <p id="info" style="color: red"></p>
                </div>
                <div class="mb-3">
                  <input type="hidden" name="githubid" value="<?= $info['id']; ?>">
                  <input type="hidden" name="githublogin" value="<?= $info['login']; ?>">
                </div>
                <div class="mb-3">
                    <input type="submit" class="form-control btn btn-primary" value="Create account">
                </div>
            </form>
        </div>
    </div>
    <script>
        function sendForm(form){
          const info = document.getElementById('info');
          const formData = new FormData(form);
          fetch('/php/handlerReg.php', {
              method: "post",
              body: formData
          }).then(response=>response.json())
              .then(result=>{
                  if(result.result == "success"){
                      location.href = "/auth.html";
                  }else if(result.result == "input_empty"){
                    info.innerText = "Not all fields are filled";
                  }else if(result.result == "exist"){
                    info.innerText = "User exists";
                  }
              });
        }
    </script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
</body>
</html>