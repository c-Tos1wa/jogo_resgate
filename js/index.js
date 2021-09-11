function start() {
  $(".start").hide();

  $(".fundo").append("<div id='player' class='anima1'></div>");
  $(".fundo").append("<div id='enemy1' class='anima2'></div>");
  $(".fundo").append("<div id='enemy2'></div>");
  $(".fundo").append("<div id='partner' class='anima3'></div>");
  $(".fundo").append("<div class='scoreboard'></div>");
  $(".fundo").append("<div class='gameBoard'></div>");



  var game = {}
  var key = {
    upArrow: 38,
    downArrow: 40,
    D: 68,
  }
  var speed = 8;
  var vertical = parseInt(Math.random() * 334);
  var shooting = true;
  var end = false;
  
  var total = 0;
  var safe = 0;
  var lost = 0;
  var gameBoard = 3;

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
    collision();
    score();
    power();
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
  
  function collision(){
    var hit = ($("#player").collision($("#enemy1")));
    
    /*se houver colisão, o enemy1 será reposicionado no eixo x, a direita
    no eixo y, randomicamente.*/
    if(hit.length > 0){
      gameBoard--;
      enemy1X = parseInt($("#enemy1").css("left"));
      enemy1Y = parseInt($("#enemy1").css('top'));
      explosion1(enemy1X, enemy1Y);
      
      position = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", position);
    }
    
    var hit2 = ($("#player").collision($("#enemy2")));
    
    if(hit2.length>0){
      gameBoard--;
      enemy2X = parseInt($("#enemy2").css("left"));
      enemy2Y = parseInt($("#enemy2").css('top'));
      explosion1(enemy2X, enemy2Y);
      
      $("#enemy2").remove();
      
      repositionEnemy2();
    }
    
    var hit3 = ($(".disparo").collision($("#enemy1")));
    
    if(hit3.length > 0){
      total = total + 100;
      enemy1X = parseInt($("#enemy1").css("left"));
      enemy1Y = parseInt($("#enemy1").css('top'));
      explosion1(enemy1X, enemy1Y);
      $(".disparo").css('left', 950);
      
      position = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", position);
    }
    
    var hit4 = ($(".disparo").collision($("#enemy2")));
    
    if (hit4.length > 0){
      total = total + 50;
      enemy2X = parseInt($("#enemy2").css("left"));
      enemy2Y = parseInt($("#enemy2").css('top'));
      
      explosion2(enemy2X, enemy2Y);
      $(".disparo").css('left', 950);
      
      repositionEnemy2();
    }
    
    var hit5 = ($("#player").collision($("#partner")));
    if (hit5.length > 0) {
      safe++;
      repositionPartner();
      $('#partner').remove();
    }
    
    var hit6 = ($("#enemy2").collision($("#partner")));
    if(hit6.length > 0){
      lost++;
      partnerX = parseInt($("#partner").css("left"));
      partnerY = parseInt($("#partner").css("top"));

      explosion3(partnerX, partnerY);
      $("#partner").remove();

      repositionPartner();
    }
  }
  
  function explosion1(){
    $(".fundo").append("<div class='explosion1'></div>");
    $(".explosion1").css("background-image", "url('../assets/imgs/explosao.png')");
    
    var div = $(".explosion1");
    div.css('top', enemy1Y);
    div.css('left', enemy1X);
    div.animate({ 
      width: 200,
      opacity: 0
    }, 'slow');
    
    var timeOfExplosion = window.setInterval(removeAnimation, 1000);
    
    function removeAnimation(){
      div.remove();
      window.clearInterval(timeOfExplosion);
      timeOfExplosion = null;
    }
  }
  
  function explosion2(enemy2X, enemy2Y){
    $(".fundo").append("<div class='explosion2'></div>")
    $(".explosion2").css("background-image", "url('../assets/imgs/explosao.png')")
    
    var effect = $('.explosion2');
    effect.css('top', enemy2Y);
    effect.css('left', enemy2X);
    effect.animate({
      width: 200,
      opacity: 0
    }, 'slow');
    
    var timeEffect = window.setInterval(removeExplosion2, 1000);
    
    function removeExplosion2(){
      effect.remove();
      window.clearInterval(timeEffect);
      timeEffect = null;
    }
  }
  
  function explosion3(partnerX, partnerY){
    $(".fundo").append("<div id='explosion3' class='anima4'></div>")
    $("#explosion3").css("top", partnerY);
    $("#explosion3").css("left", partnerX);
    
    var stopExplosion = window.setInterval(resetExplosion, 1000);
    
    function resetExplosion(){
      $('#explosion3').remove();
      window.clearInterval(stopExplosion);
      stopExplosion = null;
    }
  }
  
  function repositionEnemy2(){
    var timeOfHit4 = window.setInterval(reposition, 5000)
    
    function reposition(){
      window.clearInterval(timeOfHit4);
      timeOfHit4 = null;
      
      if (end == false){
        $(".fundo").append("<div id='enemy2'></div>")
      }
    }
  }
    

  function repositionPartner(){
    var time = window.setInterval(reposition, 6000);
    
    function reposition(){
      window.clearInterval(time);
      time = null;
      
      if(end == false){
        $('.fundo').append("<div id='partner' class='anima3'></div>");
      }
    }
  }
  
  function score(){
    $(".scoreboard").html("<h2> Pontos:  " + total + " Salvos: " + safe + " Perdidos: " + lost + "</h2>");
  }
  
  function power(){
    switch(gameBoard) {
      case 3:
        $(".gameBoard").css("background-image", "url('../assets/imgs/energia3.png')");
        break;

      case 2:
        $(".gameBoard").css("background-image", "url('../assets/imgs/energia2.png')");
        break;

      case 1: 
        $(".gameBoard").css("background-image", "url('../assets/imgs/energia1.png')");
        break;

      case 0:
        $(".gameBoard").css("background-image", "url('../assets/imgs/energia0.png')");
        //function
        break;
    }
  }
  
}