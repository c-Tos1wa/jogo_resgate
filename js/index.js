function start() {
  $(".start").hide();

  $(".fundo").append("<div id='player' class='anima1'></div>");
  $(".fundo").append("<div id='enemy1' class='anima2'></div>");
  $(".fundo").append("<div id='enemy2'></div>");
  $(".fundo").append("<div id='partner' class='anima3'></div>");
  
  var game = {}
  var key = {
    upArrow: 38,
    downArrow: 40,
    D: 68,
  }

  game.pressed = [];

  $(document).keydown(function(event){
    game.pressed[event.which] = true;
  });
  $(document).keyup(function(event){
    game.pressed[event.which] = false;
  });

  //faz a variável entrar em um looping a cada 50 ms;
  game.timer = setInterval(loop, 50);


  function loop() {
    move();

    movePlayer();
  }

  //move a imagem de fundo de acordo com o setInterval
  function move(){
    left = parseInt($('.fundo').css('background-position'));
    $('.fundo').css('background-position', left-1);
  }
  
  function movePlayer(){
    
  }
}