function Turns() {

}


Turns.prototype.load = function(){
	game.load.image('blueCover', 'assets/grid/blue player.png');
    game.load.image('redCover', 'assets/grid/red player.png');
};
Turns.showEndTurn = function(){
	var EndTurnButton = document.createElement('button');
	EndTurnButton.innerHTML = "einde beurt";
	if(playerAtSetup === 0){
		EndTurnButton.id="blue";
	}else if(playerAtSetup === 1){
		EndTurnButton.id="red";
	}
	EndTurnButton.addEventListener("click",Turns.end);
	menuElement.appendChild(EndTurnButton);
}
Turns.end = function(){
	for (let i = 0,ilen = tileData.length; i < ilen; ++i) {
		let horizontal = tileData[i];
		for (let j = 0,jlen = horizontal.length; j < jlen; ++j) {
			if( tileData[i][j] instanceof Character ){
				if(j<10){
					game.add.sprite(i*tileSize,j*tileSize,'blueCover');
				}
				else if(j>=10){
					tileData[i][j].sprite.loadTexture('redCover');
				}
			}
		}
	}
	Character.destroySelected();
	Turns.switchPlayer();

	endTurnSound = game.add.audio('end_turn');
    endTurnSound.play();
}

Turns.switchPlayer = function(){
	Menu.emptyNav();
	if(playerAtSetup === 0){
		Menu.displayMessage("Geef door aan de rode speler","start beurt",Turns.startNewTurn,1);
	}
	else if(playerAtSetup === 1){
		Menu.displayMessage("Geef door aan de blauwe speler","start beurt",Turns.startNewTurn,0);
	}
}
Turns.startNewTurn = function(){
	Menu.emptyNav();
	if(playerAtSetup === 0){
		playerAtSetup = 1;
		actionPerformed = false;
	}
	else if(playerAtSetup === 1){
		playerAtSetup = 0;
		actionPerformed = false;
	}
	if(gameStarted){
		// otherplayers turn
	//	 = false;
		actionPerformed = false;
	}else{
		Menu.startStrategy();
		gameStarted = true;
	}
	startTurnSound = game.add.audio('start_turn');
	startTurnSound.play();
}
Turns.endGame = function(loser) {
	let winnerElem = document.getElementById('winner');

	if(loser === 0) {
		winnerElem.src = '../assets/img/red_wins_text.png';
	}
	else if(loser === 1) {
		winnerElem.src = '../assets/img/blue_wins_text.png';
	}

	document.getElementById('end').style.display = 'initial';
	document.getElementById('overlay').style.display = 'initial';
}
