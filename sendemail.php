<?php
   
	header('Content-Type: application/json');

/*
	$aResult = array();

	$name = $_GET['name'];
	$email = $_GET['email'];
	$subject = $_GET['subject'];
	$postmessage = $_GET['message'];  
	$to = "spartan83470@gmail.com";
	// Email Template
	$message = "<b>Nom : </b>". $name ."<br>";
	$message .= "<b>Adresse Email : </b>".$email."<br>";
	$message .= "<b>Message : </b>".$postmessage."<br>";

	$header = "from:"+$email+" \r\n";
	$header .= "MIME-Version: 1.0\r\n";
	$header .= "Content-type: text/html\r\n";
	$retval = mail ($to,$subject,$message,$header);
	// message Notification
	if( $retval == true ) {
		$aResult['result'] = "Yes c'est gagné";
	}else {
		$aResult['error'] = 'Error in arguments!';
	}


	echo json_encode($aResult);*/
	mail('spartan83470@gmail.com', 'My Subject', "coucou");
?>