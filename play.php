<?php $size=$_POST["gridSize"];
if( $size == '') header('location:index.html');
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Squared</title>

	<!-- Styles -->
	<link rel="stylesheet" href="css/bootstrap/css/bootstrap.min.css">
	<link href="css/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">
	
	<!-- Scripts -->
	<script src="js/audio.js"></script>
	<script>
		var playerColor = '<?php echo $_POST["playerColor"]; ?>';
		var difficulty = '<?php echo $_POST["difficulty"]; ?>';
		var opponentColor = '#555';
		var size = <?php echo $size; ?>;
		document.write('<style>.player-clicked{ background-color: ' + playerColor + '; border-color: ' + playerColor + '; } .opponent-clicked { background-color: ' + opponentColor + '; border-color: ' + opponentColor + '; } #playerScore{ color: ' + playerColor + ';}#opponentScore{ color: ' + opponentColor + ';}</style>');
	</script>

</head>
<body>
	<div class="container text-center">
		<header class="text-left">
			<a href="./"><h1 id="logo"></h1><h1 id="title">Squared</h1></a>
		</header>
		
		<div>
		<div id="grid" class="">
			<!--<table style="margin: 0px auto;">-->
			 	<?php 
					for( $i=1; $i<=$size; $i++)
					{
						//echo '<tr>';
						for( $j=1; $j<=$size; $j++)
						{
							echo '<span id="dot' . $j . $i . '" class="dot" col="' . $j . '" row="' . $i . '" clicked="false"></span>';
							//echo '<td><span id="dot' . $j . $i . '" class="dot" col="' . $j . '" row="' . $i . '" clicked="false"></span></td>';
						}
						echo "<br>";
						//echo '</tr>';
					}
				?>
			<!--</table>-->
		</div>
		</div>
	</div>
	
	


	<div id="info" class="text-right">
		<a href="#moreModal" id="moreModalLink" role="button" data-toggle="modal" style="float:left"><i>how to play</i></a>
		<input type="text" id="opponentScore" value="0" style="float:right" disabled>
		<input type="text" id="playerScore" value="0" style="float:right" disabled>
		<input type="hidden" id="currentPlayer" value="player">
	</div>

	<div id="moreModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  	<div class="modal-header" style="background-color: #558cff; color: #eee;">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">How to Play</h3>
		</div>
	  	<div id="modalBody" class="modal-body text-center" style="background-color: #eee; color: #555;">
	    	<h5>You move first.</h5>
	    	<h5>Your opponent will follow.</h5>
	    	<h5>Each player may select one dot per move.</h5>
	    	<h5>The fourth and final dot completes the square.</h5>
	    	<h5>1 square = 1 point.</h5>
	 	</div>
	  	<div class="modal-footer" style="background-color: #558cff; color: #eee;">
	    	<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
	  	</div>
	</div>

	<div id="endGameModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div id="modalBody" class="modal-body text-center">

		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
			<button class="btn btn-primary" onclick="window.location.href = './'">New Game</button>
		</div>
	</div>

	<script src="js/jquery.min.js"></script>
	<script src="css/bootstrap/js/bootstrap.min.js"></script>
	<script src="js/squared1.js"></script>
	<script>$(document).ready(function() { $('table').css('min-width', $('table').outerWidth() ); });</script>
	<script>
		$('.dot').click(function(){
			playersound.playclip();
		});
	</script>
</body>
</html>