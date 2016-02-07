$('.join').click(function(event){
	event.preventDefault();
	myPlayer = $('.username').val();
	$('.username').val('');
	socket.emit('join',{
		'name': myPlayer
	})
});

socket.on('joinSuccessful',function(playerNames){
	playersList = playerNames;
	var playerListHtml = "";
	for(playerIndex in playerNames){
		playerListHtml = playerListHtml + "<p>" + playerNames[playerIndex] + "</p>"
	}
	$('.players_list').html(playerListHtml);
});

socket.on('startGame', function(playersData){
	$('.lobby').hide();
	$('.main_game').show();
	console.log(playersData);
	initialiseGame(playersData);
});