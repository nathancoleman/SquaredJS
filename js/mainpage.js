$(document).ready(function(){
	var windowHeight = $(window).outerHeight();
	var headerHeight = $('header').outerHeight();
	var gridSizeHeight = $('#gridSize').outerHeight();
	if( windowHeight > (gridSizeHeight + headerHeight) )
	{
		var marginTop = (((windowHeight-headerHeight) - gridSizeHeight)/2);
		$('#gridSize').css('margin-top',marginTop + 'px');
	}
	$('#txtGridSize').focus();
});

$('.colorPicker').click(function(){
	$('#playerColor').attr('value', $(this).attr('hexCode'));
	$('.colorPicker').removeClass('btn-pressed');
	$(this).addClass('btn-pressed');
	$('#txtGridSize').focus();
});
$('.difficultyPicker').click(function(){
	$('#difficulty').attr('value', $(this).attr('value'));
	$('.difficultyPicker').css('color','#999');
	$(this).css('color','#333');
	$('#txtGridSize').focus();
});