function start() {
  $(".start").hide();

  $(".fundo").append("<div id='player' class='anima1'></div>");
  $(".fundo").append("<div id='enemy1' class='anima2'></div>");
  $(".fundo").append("<div id='enemy2'></div>");
  $(".fundo").append("<div id='partner' class='anima3'></div>");
  
  var game = {}

  game.timer = setInterval(loop, 50);

  function loop() {
    move();
  }

  function move(){
    left = parseInt($('.fundo').css('background-position'));
    $('.fundo').css('background-position', left-1);
  }
  
}