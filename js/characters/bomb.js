function Bomb(id, player, position, sprite) {
    this.id = id;
    this.assetId = MenuItems.BOMB;
    this.player = player;
    this.attack = 3;
    this.health = 1;
    this.maxHealth = 0;
    this.tilePosition = position;
    this.sprite = sprite;
    this.range = [6, 6];
    this.type = "bomb";
    this.icon = "";
    this.asset = "";
    this.moveable = false;
}

Bomb.prototype = Object.create(Character.prototype);
Bomb.prototype.constructor = Character;

Bomb.load = function () {
  game.load.image('bbomb','assets/grid/bmijn.png');
  game.load.image('bbombGlow','assets/grid/bmijn gloed.png');
  game.load.image('rbomb','assets/grid/rmijn.png');
  game.load.image('rbombGlow','assets/grid/rmijn gloed.png');

  // game.load.audio('explosionSound', 'assets/sounds/explosion.mp3');
}