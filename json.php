<?php

    header('Content-Type: application/json');

	$filename = "credits";
	$credits = file_get_contents($filename);

	if (isset($_GET['action']) && ($_GET['action'] == 'getcredits')) {
		echo "{\"aicredits\":$credits}";
	}
	else {
		$arrayValues = array();
		$arrayValues['error'] = 'Error message here';
		$arrayValues['aicredits'] = $credits;
		$arrayValues['airesponse'] = 'Data goes here from OpenAI';

		if(isset($_GET['action'])) {
			$action = $_GET['action'];
			$arrayValues['airesponse'] = "Data from action \"$action\" goes here from OpenAI";
		}
		echo json_encode($arrayValues);

		$credits = file_get_contents($filename);
		file_put_contents($filename, ((int)$credits) - 1);
	}
