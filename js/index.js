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
  var speed = 8;
  var vertical = parseInt(Math.random() * 334);
  var shooting = true;

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
    movePartner();
  }

  function move() {
    left = parseInt($('.fundo').css('background-position'));
    $('.fundo').css('background-position', left - 1);
  }

  function movePlayer() {
    if (game.pressed[key.upArrow]) {
      var above = parseInt($('#player').css("top"));
      $("#player").css("top", above - 10);

      if (above <= 0) {
        $("#player").css("top", above + 10);
      }
    }

    if (game.pressed[key.downArrow]) {
      var above = parseInt($('#player').css('top'));
      $('#player').css("top", above + 10);

      if (above >= 434) {
        $("#player").css("top", above - 10);
      }
    }
    if (game.pressed[key.D]) {
      toShoot();
    }
  }

  function moveEnemy1() {
    horizontal = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", horizontal - speed);
    $("#enemy1").css("top", vertical);

    if (horizontal <= 0) {
      vertical = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", vertical);
    }
  }

  function moveEnemy2() {
    x = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", x - 5);

    if (x <= 0) {
      $("#enemy2").css("left", 775);
    }
  }

  function movePartner() {
    axis = parseInt($("#partner").css("left"));
    $("#partner").css("left", axis + 1);

    if (axis > 906) {
      $("#partner").css("left", 0);
    }
  }

  function toShoot() {
    if (shooting == true) {
      shooting = false;

      above = parseInt($("#player").css("top"))
      x = parseInt($("#player").css("left"))
      shootInX = x + 190;
      shootTop = above + 37;
      $(".fundo").append("<div class='disparo'></div>")
      $(".disparo").css("top", shootTop);
      $(".disparo").css("left", shootInX);

      var timeShoot = window.setInterval(toTarget, 30);
    }

    function toTarget() {
      position = parseInt($(".disparo").css('left'))
      $('.disparo').css('left', position + 15);

      if (position > 900) {
        window.clearInterval(timeShoot);
        timeShoot = null;
        $('.disparo').remove();
        shooting = true;
      }
    }
  }

}