var lastOMoveCol = 0;
var lastOMoveRow = 0;
var windowHeight = $(window).outerHeight();
var windowWidth = $(window).outerWidth();
var headerHeight = $('header').outerHeight();
var gridHeight = $('#grid').outerHeight();
var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);


/**
 * Center the grid within the user's window. If the grid is smaller
 * than the available window space (minus the header) and there is
 * more horizontal space than vertical space, no adjustments to dot
 * spacing are required. Otherwise, the grid needs to be more dense.
 */
if( (windowHeight > (gridHeight + headerHeight)) && (windowWidth > windowHeight) ) {
	var marginTop = (((windowHeight-headerHeight) - gridHeight)/2);
	$('#grid').css('margin-top',marginTop + 'px');
}
else {
	$('#info').css('position','relative');
	if(windowWidth > windowHeight) {
		var gridSpace = windowHeight - headerHeight - $('#info').outerHeight();
		$('#grid').css('margin-top','0px');
		$('.dot').css('margin', (gridSpace/(size*3)) + 'px');
	}
	else {
		$('#grid').css('margin-top','0px');
		$('.dot').css('margin', ($('.container').outerWidth()/(size*5)) + 'px');
	}
}


/**
 * Whenever the user clicks on a dot, check to see if it is his/her turn
 * and make the move. If it's currently the computer's turn, do nothing.
 */
$('.dot').click(function() {
	if( $('#currentPlayer').val() == 'player' ) {
		if( $('#' + this.id).attr('clicked') == 'false' ) {
			playerMove(this);
		}
	}
});


/**
 * Determine whether a move made on the dotid should connect the dot to
 * the adjacent dots within the grid. This is done by checking North,
 * South, East, and West dots via their respective col and row attributes.
 */
function checkAdjacent(dotid) {
	var dot = $('#' + dotid);
	
	var north = $("#dot" + dot.attr('col') + (dot.attr('row') - 1));
	var south = $("#dot" + dot.attr('col') + (dot.attr('row')*1 + 1));
	var east = $("#dot" + (dot.attr('col')*1 + 1) + dot.attr('row'));
	var west = $("#dot" + (dot.attr('col') - 1) + dot.attr('row'));

	if( north.attr('clicked') == 'true' ) {
		connect(dot.attr('id'),north.attr('id'));
	}
	if( south.attr('clicked') == 'true' ) {
		connect(south.attr('id'),dot.attr('id'));
	}
	if( east.attr('clicked') == 'true' ) {
		connect(dot.attr('id'),east.attr('id'));
	}
	if( west.attr('clicked') == 'true' ) {
		connect(west.attr('id'),dot.attr('id'));
	}

	checkForScore(dot);
}


/**
 * Connect dots with id1 and id2 by drawing a line on the screen.
 */
function connect(id1,id2)
{
	var offset1 = $('#'+id1).offset();
	var offset2 = $('#'+id2).offset();
	drawline(offset1,offset2);
}


/**
 * Determine whether making a move on the given dot justifies a
 * score increase. This is only necessary if the dot has not already
 * been clicked.
 */
function checkForScore(dot) {
	if( dot.attr('clicked') == 'false' ) {
		var x = dot.attr('col')*1;
		var y = dot.attr('row')*1;
		var scoreCount = 0;
		var north = $('#dot' + x + (y-1) ).attr('clicked');
		var northeast = $('#dot' + (x+1) + (y-1) ).attr('clicked');
		var east = $('#dot' + (x+1) + y ).attr('clicked');
		var southeast = $('#dot' + (x+1) + (y+1) ).attr('clicked');
		var south = $('#dot' + x + (y+1) ).attr('clicked');
		var southwest = $('#dot' + (x-1) + (y+1) ).attr('clicked');
		var west = $('#dot' + (x-1) + y ).attr('clicked');
		var northwest = $('#dot' + (x-1) + (y-1) ).attr('clicked');

		//Check SW square
		if( west == 'true' ) {
			if( southwest == 'true' ) {
				if( south == 'true' ) {
					scoreCount++;
				}
			}
		}

		//Check NW square
		if( west == 'true' ) {
			if( northwest == 'true' ) {
				if( north == 'true' ) {
					scoreCount++;
				}
			}
		}

		//Check NE square
		if( north == 'true' ) {
			if( northeast == 'true' ) {
				if( east == 'true' ) {
					scoreCount++;
				}
			}
		}

		//Check SE square
		if( east == 'true' ) {
			if( southeast == 'true' ) {
				if( south == 'true' ) {
					scoreCount++;
				}
			}
		}

		if( $('#currentPlayer').val() == 'player' ) {
			$('#playerScore').val( $('#playerScore').val()*1 + scoreCount);
		}
		else {
			$('#opponentScore').val( $('#opponentScore').val()*1 + scoreCount );
		}
	}
}

/**
 * Determine the possible "score", or how many connections a
 * move on this dot will make.
 */
function calcScore(dot) {
	if( dot.attr('clicked') == 'false' )
	{
		var x = dot.attr('col')*1;
		var y = dot.attr('row')*1;
		var scoreCount = 0;
		var north = $('#dot' + x + (y-1) ).attr('clicked');
		var northeast = $('#dot' + (x+1) + (y-1) ).attr('clicked');
		var east = $('#dot' + (x+1) + y ).attr('clicked');
		var southeast = $('#dot' + (x+1) + (y+1) ).attr('clicked');
		var south = $('#dot' + x + (y+1) ).attr('clicked');
		var southwest = $('#dot' + (x-1) + (y+1) ).attr('clicked');
		var west = $('#dot' + (x-1) + y ).attr('clicked');
		var northwest = $('#dot' + (x-1) + (y-1) ).attr('clicked');

		//Check SW square
		if( west == 'true' )
			if( southwest == 'true' )
				if( south == 'true' )
					scoreCount++;

		//Check NW square
		if( west == 'true' )
			if( northwest == 'true' )
				if( north == 'true' )
					scoreCount++;

		//Check NE square
		if( north == 'true' )
			if( northeast == 'true' )
				if( east == 'true' )
					scoreCount++;

		//Check SE square
		if( east == 'true' )
			if( southeast == 'true' )
				if( south == 'true' )
					scoreCount++;

		return scoreCount;
	}
}


/**
 * Check every possible move in the grid and find the one
 * that will lead to the highest "score", meaning that a
 * particular move connects the chosen dot to the most others.
 */
function chooseOnHighestScore() {
	var col,row,max=0,bestChoice=null;
	for( row=1; row<=size; row++ )
	{
		for( col=1; col<=size; col++ )
		{
			if( $('#dot' + col + row).attr('clicked') == 'false' )
			{
				var score = calcScore( $('#dot' + col + row) );
				if( score > max )
				{
					max = score;
					bestChoice = '#dot' + col + row;
				}
			}
		}
	}

	return $(bestChoice);
}

/**
 * Draw a line to connect 2 dots. This is done by drawing a div
 * with borders which has no space in the center and is stretched
 * to the proper width/height (lines on the grid only go up or down).
 */
function drawline(of1, of2) {
	var top,left,height,width;
	if( of1.left == of2.left ) {
		top = of2.top + 7.5;
		left = of2.left + 6;
		height = of1.top - of2.top;
		width = 5;
	}
	else {
		top = of2.top + 6;
		left = of1.left + 7.5;
		height = 5;
		width = of2.left - of1.left;
	}

	var htmlLine = '<div id="line"></div>';
	$( "body" ).prepend( htmlLine );
	htmlLine = $('#line');
	htmlLine.css('position','absolute');
	htmlLine.css('top',top + 'px');
	htmlLine.css('left',left + 'px');
	htmlLine.css('min-height',height + 'px');
	htmlLine.css('min-width',width + 'px');
	htmlLine.css('border-radius','5px');

	if( $('#currentPlayer').val() == 'player' ) {
		htmlLine.css('background-color', playerColor);
	}
	else {
		htmlLine.css('background-color', opponentColor);
	}
}

/**
 * Make a move on the dot that the player clicked on. This will
 * play a sound, mark the dot as clicked by the player, check the
 * adjacent dots to determine whether they should be connected,
 * and then determine whether this is a scoring move. Lastly, it
 * will trigger a move by the computer 1 second later.
 */
function playerMove(dot) {
	if(!mobile) {
		playersound.playclip();
	}
	$(dot).addClass('player-clicked');
	checkAdjacent(dot.id);
	$(dot).attr('clicked','true');
	
	if( $('#currentPlayer').val() == 'player' ) {
		$('#currentPlayer').val('computer');
		setTimeout(compMove, 1000);
	}
}


/**
 * Determine which move to make for the computer. This is
 * only necessary if it is currently the computer's turn and
 * the game is not over yet. This move is determined by assigning
 * probabilities, based on the user's chosen difficulty, that the
 * computer will either choose the highest scoring move on the grid,
 * choose a move adjacent to the last move by the player (preference
 * in clockwise order from North dot), or choose
 * a "random" move within the grid.
 * 
 * For easy difficulty: 30% chance of choosing highest score
 * 			55% chance of choosing adjacent to last
 * 			15% chance of choosing random move
 * 
 * For medium difficulty: 60% chance of choosing highest score
 * 			  30% chance of choosing adjacent to last
 * 			  10% chance of choosing random move
 * 
 * For high difficulty: 100% chance of choosing highest score
 */
function compMove() {
	if( $('#currentPlayer').val() == 'computer' ) {
		if( checkForEnd() ) {
			return false;
		}

		var low,mid;
		if(difficulty == 'easy') {
			low = 30;
			mid = 85;
		}
		else if(difficulty == 'medium') {
			low = 60;
			mid = 90;
		}
		else {
			low = 100;
			mid = 100;
		}

		while(true) {
			var choice = getRand(1,100);
			var dotID = "";
			//Choose highest score
			if(choice < low) {
				var high = chooseOnHighestScore();
				if( typeof high.attr('id') == 'string' ) dotID = high.attr('id');
			}

			//Choose based on last move
			else if(choice < mid) {
				//Check N
				var north = $('#dot' + lastOMoveCol + (lastOMoveRow-1));
				if( north.attr('clicked') == 'false' ) {
					lastOMoveRow--;
					dotID = north.attr('id');
				}
				//Check NE
				var northeast = $('#dot' + (lastOMoveCol*1+1) + (lastOMoveRow-1));
				if( northeast.attr('clicked') == 'false' ) {
					lastOMoveCol++;
					lastOMoveRow--;
					dotID = northeast.attr('id');
				}
				//Check E
				var east = $('#dot' + (lastOMoveCol*1+1) + lastOMoveRow);
				if( east.attr('clicked') == 'false' ) {
					lastOMoveCol++;
					dotID = east.attr('id');
				}
				//Check SE
				var southeast = $('#dot' + (lastOMoveCol*1+1) + (lastOMoveRow*1+1));
				if( southeast.attr('clicked') == 'false' ) {
					lastOMoveCol++;
					lastOMoveRow++;
					dotID = southeast.attr('id');
				}
				//Check S
				var south = $('#dot' + lastOMoveCol + (lastOMoveRow*1+1));
				if( south.attr('clicked') == 'false' ) {
					lastOMoveRow++;
					dotID = south.attr('id');
				}
				//Check SW
				var southwest = $('#dot' + (lastOMoveCol-1) + (lastOMoveRow*1+1));
				if( southwest.attr('clicked') == 'false' ) {
					lastOMoveCol--;
					lastOMoveRow++;
					dotID = southwest.attr('id');
				}
				//Check W
				var west = $('#dot' + (lastOMoveCol-1) + lastOMoveRow);
				if( west.attr('clicked') == 'false' ) {
					lastOMoveCol--;
					dotID = west.attr('id');
				}
				//Check NW
				var northwest = $('#dot' + (lastOMoveCol-1) + (lastOMoveRow-1));
				if( northwest.attr('clicked') == 'false' ) {
					lastOMoveCol--;
					lastOMoveRow--;
					dotID = northwest.attr('id');
				}
			}

			// Choose random
			else {
				while(true) {
					var row = getRand(1,size);
					var col = getRand(1,size);
					
					var randDot = $('#dot' + col + row);
					if( randDot.attr('clicked') == 'false' ) {
						lastOMoveCol = col;
						lastOMoveRow = row;
						dotID = randDot.attr('id');
						break;
					}
				}
			}

			// If the chosen method found a dot, then mark it
			if( dotID != "" ) {
				var compDot = $('#' + dotID);
				compDot.addClass('opponent-clicked');
				if(!mobile) {
					opponentsound.playclip();
				}
				checkAdjacent( compDot.attr('id') );
				$('#currentPlayer').val('player');
				compDot.attr('clicked','true');
				checkForEnd();
				return true;
			}
		}
	}
}

/**
 * Get a random integer value between min and max
 */
function getRand(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * Determine whether the game is over. This is done by subtracting
 * the player's and the computer's scores from the total possible
 * number of points. Each complete square is 1 point, so possible
 * points = (n-1)^2 where n is the length of a side in dots.
 */
function checkForEnd() {
	var pScore = $('#playerScore').val()*1;
	var oScore = $('#opponentScore').val()*1;
	var totalScore = pScore + oScore;
	var possiblePoints = (size-1) * (size-1);
	if( possiblePoints == totalScore ) {
		if( pScore < oScore ) {
			$('#endGameModal #modalBody').html('<h1>You Lose!</h1>');
		}
		else if( pScore > oScore ) {
			$('#endGameModal #modalBody').html('<h1>You Win!</h1>');
		}
		else {
			$('#endGameModal #modalBody').html('<h1>You Tied!</h1>');
		}

		$('#endGameModal').modal('show');
		return true;
	}
	
	return false;
}
