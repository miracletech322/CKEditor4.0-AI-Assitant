<?php

    header('Content-Type: application/json');

	$arrayValues = array();
	$arrayValues['error'] = 'Error message here';
	$arrayValues['aicredits'] = 100;
	$arrayValues['airesponse'] = 'Data goes here from OpenAI';

    echo json_encode($arrayValues);