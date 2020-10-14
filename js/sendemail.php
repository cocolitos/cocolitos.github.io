<?php
   
	header('Content-Type: application/json');

	$aResult = array();

	if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

	if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

	if( !isset($aResult['error']) ) {
		$aResult['error'] = 'Error in arguments!';
		$aResult['result'] = add(floatval($_POST['arguments'][0]), floatval($_POST['arguments'][1]));
	}

	$name = $_POST['name'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$postmessage = $_POST['message'];  
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


	echo json_encode($aResult);
?>