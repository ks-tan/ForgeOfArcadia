var socket = io('http://localhost:5000');
var myPlayer = "";
var playersList = [];
var orderedPlayersList = [];
var lowestActionFrameZIndex = 0;
var actionType = "";
var currentPlayersData;
var resourceOfferList = [];
var resourceRequestList = [];

const NUM_OF_OPPONENTS = 3;