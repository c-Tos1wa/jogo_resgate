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
  var speed = 10;
  var vertical = parseInt(Math.random()*334);

  game.pressed = [];

  $(document).keydown(function (event) {
    game.pressed[event.which] = true;
  });
  $(document).keyup(function (event) {
    game.pressed[event.which] = false;
  });

  game.timer = setInterval(loop, 50);


  function loop() {
    move();
    movePlayer();
    moveEnemy1();
    moveEnemy2();
  }

  function move() {
    left = parseInt($('.fundo').css('background-position'));
    $('.fundo').css('background-position', left - 1);
  }

  function movePlayer() {
    if (game.pressed[key.upArrow]) {
      var above = parseInt($('#player').css("top"));
      $("#player").css("top", above - 10);

      if ( above<=0 ) {
        $("#player").css("top", above+10);
      }
    }

    if (game.pressed[key.downArrow]) {
      var above = parseInt($('#player').css('top'));
      $('#player').css("top", above + 10);

      if(above>=434) {
        $("#player").css("top", above-10);
      }
    }
    if (game.pressed[key.D]) {
      //function
    }
  }

  function moveEnemy1(){
    horizontal = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", horizontal-speed);
    $("#enemy1").css("top", vertical);

    if (horizontal<=0) {
      vertical = parseInt(Math.random()*334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", vertical);
    }
  }

  function moveEnemy2(){
    x = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", x-5);

    if(x<=0){
      $("#enemy2").css("left", 775);
    }
  }


}