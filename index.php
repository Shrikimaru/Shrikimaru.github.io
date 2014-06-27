<!DOCTYPE html>
<html>
<head>
	<meta charset="utf8">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

	<div id="hand">
		<div id="card_first" class="card"></div>
		<div id="card_second" class="card"></div>
	</div>

	<div id="situation">
		<p id="position"></p>
		<p id="actions_before"></p>
	</div>
	
	<div id="answers">
		<input type="button" class="answer_button" id="fold" value="Fold">
		<input type="button" class="answer_button" id="call" value="Call">
		<input type="button" class="answer_button" id="call20" value="Call20">
		<input type="button" class="answer_button" id="raise" value="Raise">
	</div>

<script src="script.js"></script>
</body>
</html>