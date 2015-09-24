<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Squared</title>

	<link rel="stylesheet" href="css/bootstrap/css/bootstrap.min.css">
	<link href="css/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>

	<div class="container text-center">
		<header class="text-left">
			<a href="./"><h1 id="logo"></h1><h1 id="title">Squared</h1></a>
		</header>

		
		<form action="play.php" onsubmit="return validateForm()" method="post">
			<div id="gridSize">
				
				<input type="text" autocomplete="off" maxlength="1" width="1" id="txtGridSize" name="gridSize"><sup class="r">2</sup>
				<br>
				<input type="hidden" id="playerColor" name="playerColor" value="#558cff">
				<a class="btn btn-large colorPicker" hexCode="#ff4444" style="border-radius:0px;background:none;background-color:#ff4444;"></a>
				<a class="btn btn-large colorPicker btn-pressed" hexCode="#558cff" style="border-radius:0px;background:none;background-color:#558cff;"></a>
				<a class="btn btn-large colorPicker" hexCode="#ffc754" style="border-radius:0px;background:none;background-color:#ffc754;"></a>
				<a class="btn btn-large colorPicker" hexCode="#33b5e5" style="border-radius:0px;background:none;background-color:#33b5e5;"></a>
				<br>
				<input type="hidden" id="difficulty" name="difficulty" value="easy">
				<a class="btn difficultyPicker" value="easy" alt="Easy" style="background:none;border:none;box-shadow:none;color:#333;font-weight:bold;margin-top:20px;">easy</a>
				<a class="btn difficultyPicker" value="medium" alt="Medium" style="background:none;border:none;box-shadow:none;color:#999;font-weight:bold;margin-top:20px;margin-top:20px;">med</a>
				<a class="btn difficultyPicker" value="hard" alt="Hard" style="background:none;border:none;box-shadow:none;color:#999;font-weight:bold;margin-top:20px;">hard</a>
			</div>
		</form>

	</div>
	<a href="#moreModal" role="button" data-toggle="modal" style="position:absolute;bottom:20px;left:20px;"><i>how to</i></a>
	<div id="moreModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  	<div class="modal-header" style="background-color: #558cff; color: #eee;">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">Info</h3>
		</div>
	  	<div id="modalBody" class="modal-body text-center" style="background-color: #eee; color: #555;">
	    	<h4>The size of a square is between 1 and 9.</h4>
	    	<h4>Enter the size square you would like.</h4>
	    	<h4>Select the color you wish to be.</h4>
	    	<h4>Choose a difficulty.</h4>
	    	<h4><i>Press the Enter key.</i></h4>
	 	</div>
	  	<div class="modal-footer" style="background-color: #558cff; color: #eee;">
	    	<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
	  	</div>
	</div>

	<script src="js/jquery.min.js"></script>
	<script src="css/bootstrap/js/bootstrap.min.js"></script>
	<script src="js/mainpage.js"></script>
	<script>
		function validateForm()
		{
			if( /^[1-9]+$/.test( $('#txtGridSize').val() ) )
				return true;
			else
				return false;
		}
	</script>
</body>
</html>
