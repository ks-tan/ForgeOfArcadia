
listenToActionTabButtons();
listenToActionPanelButtons();
listenToTradeButtons();

function initialiseGame(playersData) {
	arrangePlayers();
	initialiseTopPlayerPanels();
	initialiseBottomPlayerPanels();
	updatePlayersData(playersData);
}

function arrangePlayers(){
	for(playerIndex in playersList){
		if (playersList[playerIndex] != myPlayer){
			orderedPlayersList.push(playersList[playerIndex]);
		}
	}
	orderedPlayersList.push(myPlayer);
}

function initialiseTopPlayerPanels () {
	for(var i = 1; i < NUM_OF_OPPONENTS; i++) {
	 	$('.player_panel:first').clone().appendTo('.top_player_panels').attr("id","player"+i);
	 	$('#player'+i+' .background').attr('src','images/playerPanel'+i+'.png');
	 	$('#player'+i+' .player_name').html(orderedPlayersList[i]);
	 	$('#player'+i).addClass(orderedPlayersList[i]);
	}
	$('#player0').addClass(orderedPlayersList[0]);
	$('#player0 .player_name').html(orderedPlayersList[0]);
}

function initialiseBottomPlayerPanels () {
	$('#my_player').addClass(orderedPlayersList[3]);
	$('#my_player .player_name').html(orderedPlayersList[3]);
	var i = 0;
	$('.player_button .text').each(function(){
		$(this).html(orderedPlayersList[i]);
		i++;
	});
}

function updatePlayersData(playersData) {
	for(name in playersData){
		$('.'+name+' #wood').html(playersData[name].Wood);
		$('.'+name+' #iron').html(playersData[name].Iron);
		$('.'+name+' #gold').html(playersData[name].Gold);
		$('.'+name+' #lumber').html(playersData[name].Lumber);
		$('.'+name+' #mithril').html(playersData[name].Mithril);
		$('.'+name+' #treasure').html(playersData[name].Treasure);
		$('.'+name+' #woodmill').html(playersData[name].Woodmill);
		$('.'+name+' #ironforge').html(playersData[name].IronForge);
		$('.'+name+' #goldmine').html(playersData[name].GoldMine);
		$('.'+name+' #lumbermill').html(playersData[name].LumberMill);
		$('.'+name+' #mithrilforge').html(playersData[name].MithrilForge);
		$('.'+name+' #treasuremine').html(playersData[name].TreasureMine);
	}
	currentPlayersData = playersData;
}

function listenToActionTabButtons(){
	$('.action_frame .frame_button').click(function(){
		selectedFrame = $(this).parent().parent();
		selectedFrame.siblings().removeClass('action_frame_down');
		selectedFrame.siblings().removeClass('action_frame_up');
		selectedFrame.css('z-index',--lowestActionFrameZIndex);
		if (!selectedFrame.hasClass('action_frame_up')){
			selectedFrame.siblings().addClass('action_frame_down');
			selectedFrame.addClass('action_frame_up');
			selectedFrame.removeClass('action_frame_down');
		} else {
			selectedFrame.addClass('action_frame_down');
			selectedFrame.removeClass('action_frame_up');
		}
	});
}

function listenToActionPanelButtons() {
	$('.action_panel_button').click(function(e){
		$('.more_options').hide();
		actionType = $(this).attr('id');
		$('.'+actionType).show();
		if (actionType == "private") {
			$('.public_everyone').hide();
			$('.bank_only').hide();
			$('.player_buttons').show();
		} else if (actionType=="public") {
			$('.bank_only').hide();
			$('.public_everyone').show();
			$('.player_buttons').hide();
		} else if (actionType == "bank") {
			$('.bank_only').show();
			$('.public_everyone').hide();
			$('.player_buttons').hide();
		}
	});
}

function listenToTradeButtons(){
	var tradingPlayer = "";
	$('.player_button').click(function(){
		$('.player_button').removeClass('selected');
		$(this).addClass('selected');
		tradingPlayer = $(this).find($('.text')).html();
		$('.offer_panel.you_give .text').html("Offering");
		initialiseCalculator(tradingPlayer);
	});
	listenToCalculatorOfferButtons();
}

function initialiseCalculator(tradingPlayer){
	resourceOfferList = [];
	$('.offering').html('');
	$('.overlay').fadeIn();
	$('.trade_menu').fadeIn();
	initialiseCalculatorView(tradingPlayer);
	listenToCalculatorControlButtons(tradingPlayer);
}

function listenToCalculatorControlButtons(tradingPlayer){
	$('.overlay').click(function(){
		$('.overlay').fadeOut();
		$('.trade_menu').fadeOut();
		$('.offer_panel.you_give .text').html("Offering");
		resourceOfferList = [];
		$('.offering').html('');
	});
	$('.bottom_button.confirm').click(function(){
		$('.overlay').fadeOut();
		$('.trade_menu').fadeOut();
		$('.offering').html('');
	});
	$('.bottom_button.clear').click(function(){
		initialiseCalculatorView(tradingPlayer);
		$('.offer_panel.you_give .text').html("Offering");
		resourceOfferList = [];
		$('.offering').html('');
	});
}

function listenToCalculatorOfferButtons(){
	$('.your_resources .resource_count').click(function(){
		resourceDisplay = $(this);
		resourceType = $(this).attr('id');
		resourceCount = parseInt($(this).html());
		if (resourceCount > 0){
			resourceDisplay.html(--resourceCount);
			if(resourceOfferList[resourceType]){
				resourceOfferList[resourceType]++;
			} else {
				resourceOfferList[resourceType] = 1;
			}
			var offerStatement = "";
			for (name in resourceOfferList){
				offerStatement = offerStatement + " " + resourceOfferList[name] + " " + name + " ";
			}
			$('.offering').html(offerStatement);
			$('.offer_panel.you_give .text').html(offerStatement);
		}
	});
}

function initialiseCalculatorView(tradingPlayer){
	var myPlayerData = currentPlayersData[myPlayer];
	for(resource in myPlayerData){
		$('.resource_buttons .your_resources #'+resource).html(myPlayerData[resource]);
	}
	if(actionType == 'private' && tradingPlayer){
		var tradingPlayerData = currentPlayersData[tradingPlayer];
		$('.player_resources.others_resources .title').html(tradingPlayer + "'s Resources");
		for(resource in tradingPlayerData){
			$('.resource_buttons .others_resources #'+resource).html(tradingPlayerData[resource]);
		}
	} else {
		if (actionType == "bank"){
			$('.player_resources.others_resources .title').html("Bank");
		} else {
			$('.player_resources.others_resources .title').html("Open Request");
		}
		$('.others_resources').find('.resource_count').html(0);
		$('.others_resources').find('.generator_count').html(0);
	}

}




























