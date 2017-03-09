var menuElement = document.getElementsByTagName('nav')[0];
var characterItems = document.querySelectorAll('nav a');
var selectedChar;
function Menu(){

}

Menu.prototype.load = function(){
    this.placeChar();
    for(let menuItem = 0,ilen = characterItems.length; menuItem < ilen; ++menuItem){
        context = this;
        (function(place){
            characterItems[place].addEventListener("click", function(){context.SelectChar(event,place)}, false);
        })(menuItem)
    }
};

Menu.prototype.SelectChar = function(event,arrayPos){
    event.preventDefault();
    toggleSelectClass(arrayPos);
    selectedChar = characterItems[arrayPos];

    buttonClickSound = game.add.audio('button_click');
    buttonClickSound.play();
}

Menu.prototype.placeChar = function(){
    context = this;
    game.input.onTap.add(function (pointer, event) {
        tileX = tileLayer.getTileX(this.game.camera.x + pointer.x);
        tileY = tileLayer.getTileY(this.game.camera.y + pointer.y);
        selectedTile = tileData[tileX][tileY];
        if (selectedTile === 0 && selectedChar !== null){
            if((playerAtSetup === 0 && tileX < 10) || (playerAtSetup === 1 && tileX >= 10)){
                let charId;
                switch (selectedChar.querySelector("figure figcaption").innerHTML) {
                    case "Soldaat":
                        charId = MenuItems.SOLDIER;
                        break;
                    case "Radar":
                        charId = MenuItems.FLAG;
                        break;
                    case "Mijn":
                        charId = MenuItems.BOMB;
                        break;
                    case "Dokter":
                        charId = MenuItems.MEDIC;
                        break;
                    case "Sniper":
                        charId = MenuItems.SNIPER;
                        break;
                    case "Tank":
                        charId = MenuItems.TANK;
                        break;
                }
                Tile.putCharacter(charId,tileX,tileY);
                selectedChar.remove();
                selectedChar = null;
                clearSelection();
                checkNav();
            }
        }
    });

}
function checkNav(){
    if(document.querySelectorAll('nav a').length === 0){
        if(playerAtSetup === 0){
    		blueSetStrategy = true;
    	}
    	else if(playerAtSetup === 1){
    		redSetStrategy = true;
    	}
        Turns.showEndTurn();
    }
}
function clearSelection(){
    for(let menuItem = 0,ilen = characterItems.length; menuItem < ilen; ++menuItem){
        if(characterItems[menuItem].className !== ""){
            characterItems[menuItem].removeAttribute("class");
        }
    }
}
function toggleSelectClass(pos){
    clearSelection();
    characterItems[pos].classList.add("selected");
}

Menu.showHealth = function(value){
    if(!menuElement.querySelector("figure.heart")){
        let heartFig = document.createElement('figure');
        let heartImg = document.createElement('img');
        let heartData = document.createElement('figcaption');
        heartFig.className = "heart";
        heartImg.src = "assets/sprites/heart.png";
        heartImg.alt = "hart met "+value+" in";
        heartData.innerHTML = value;
        heartFig.appendChild(heartImg);
        heartFig.appendChild(heartData);
        menuElement.appendChild(heartFig);
    }
    else{
        menuElement.querySelector(".heart>figcaption").innerHTML = value;
    }
}
Menu.removeHealth = function(){
    if(menuElement.querySelector("figure.heart")){
        menuElement.querySelector("figure.heart").remove();
    }
}
Menu.emptyNav = function(){
    for (let i = 0,ilen = menuElement.children.length; i < ilen; ++i) {
		menuElement.children[i].remove();
	}
}

Menu.displayMessage = function(message, buttonTekst = "",callback = function(){console.log("er is geen functie toegewezen");},player = 0){
    let text = document.createElement("p");
    text.innerHTML = message;
    menuElement.appendChild(text);
    if(buttonTekst !== ""){
        let button = document.createElement("button");
        if(player === 0){
            button.id = "blue";
        }
        else if(player === 1){
            button.id = "red";
        }
        button.innerHTML = buttonTekst;
        button.addEventListener("click",callback);
        menuElement.appendChild(button);
    }
}
Menu.startStrategy = function(){
    if(playerAtSetup === 0){
		// blue
	}
	else if(playerAtSetup === 1){
        // red
	}
}

document.getElementsByClassName('purple')[0].addEventListener('click', removeOverlay);

function removeOverlay() {
    Menu.startStrategy();
    document.getElementById('overlay').remove();
}
