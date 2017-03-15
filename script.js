var doWork;
var i;

var audio = new Audio('sounds/clap.wav');
var gameAudio = new Audio('sounds/game.mp3');
    gameAudio.loop = true;

var model = {
  players: ["Stanley", "Tommy", "Tom", "Tomm", "Stan"],
  won_players: [],
  isStop: true,
  currentWinner: null,
  firstRound: true
}

var view = {
  generateViewByPlayer: function() {
    var tpl = "<div class='player'>%name</div>";
    var result = "";
    model.players.forEach(function(value) {
      result += tpl.replace('%name', value)
    })
    return result;
  },
  injectPlayerContentToDom: function() {
    var wrapper = $('.play-wrap');
    wrapper.html('');
    $('.play-wrap').html(view.generateViewByPlayer())
  },
  displayWinner: function(winnerIndex) {
    $('.play-wrap .player').eq(winnerIndex).addClass('active')
    
    setTimeout(function(){
      view.renderWinnerList()
      $('.play-wrap .player').eq(winnerIndex).addClass('currentWinner')
      $('.app').addClass('win')
      audio.play();
    },100)
  },
  renderWinnerList: function() {
    // First update the number of won players
    $('.number').text(model.won_players.length)
    var tpl = '';
    var LastWinnerIndex = model.won_players.length - 1;
    tpl += '<p class="item">' + model.won_players[LastWinnerIndex] + '</p>'
    $('.winner-list').append(tpl)
  },
  reveilWinner: function() {
    
    var totalLength = model.players.length - 1;
    i = 0;
    var q = 0;
    if (totalLength < 1) return alert('Players must be more than two')
    doWork = setInterval(function(){
      if(model.isStop){
        if (i == 0) {
          i = totalLength
        }else{
          i = i - 1;
        }
        console.log(i)
        // delete winner from model
        model.won_players.push(model.players[i])
        model.players.splice(i, 1)
        clearInterval(doWork)
        return setTimeout(function(){
          view.displayWinner(i)
        }, 0)
      }
      if (i > totalLength) {
        i = 0;
      }
      (function(j) {
        $('.play-wrap .player').eq(j).addClass('active')
        setTimeout(function() {
          $('.play-wrap .player').eq(j).removeClass('active')
        }, 0)
      })(i)
      i++;
    }, 100)
    // view.displayWinner()
  },
  playScreen: function() {
    // Display the spinner first ...

    $('.mask').show()
    $('.logo').addClass('flip')

    setTimeout(function(){
      $('.mask').hide()
      $('.entry').css('display', 'none')
      $('.logo').hide()
      $('.dataEntry').hide()
      $('.app').show()
      $('.logo-wrapper').show()
      $('.play-wrap').show()
      $('.winner-list').show()
      $('.play-wrap').css('display', 'flex')
      $('.control-wrap').show()
      $('.control-wrap').css('display', 'flex')

      // Listen for enter listen to trigger game play logic
      $(document).keypress(function(e) {
          if(e.which == 13) {
              // First we need to decide if we want to play or stop the game
            
            if(model.firstRound) {
              model.firstRound = false
              if(model.isStop){
              model.isStop = false
              $('.app').removeClass('win')
              gameAudio.play()
              $('.playGame').text('stop')
              $('.player.active').removeClass('currentWinner')
              
              view.injectPlayerContentToDom()
              view.reveilWinner()
              
              }else{
                // To Trigger STOP button
                gameAudio.pause()
                controller.stop()
              }
            }else {
              if(model.isStop){
              model.isStop = false
              $('.app').removeClass('win')
              gameAudio.play()
              $('.playGame').text('stop')
              $('.player.active').removeClass('currentWinner')
              setTimeout(function(){
                view.injectPlayerContentToDom()
                view.reveilWinner()
              }, 1000)
              }else{
                // To Trigger STOP button
                gameAudio.pause()
                controller.stop()
              }
            }
          }
      });
    }, 3000)
  }
}

var controller = {
  playGame: function() {
    // First we need to decide if we want to play or stop the game
    if(model.isStop){
      model.isStop = false
      $('.play-wrap .player').removeClass('currentWinner')
      $('.playGame').text('Stop')
      view.injectPlayerContentToDom()
      // debugger
      console.log(model)
      view.reveilWinner()
    }else{
      // To Trigger STOP button
      controller.stop()
    }
    
  },
  stop: function(){
    model.isStop = true;
    $('.playGame').text('Play')
    model.currentWinner = i;
  }
}


$(document).ready(function(){
  $('.playGame').on('click', function(){
    controller.playGame()
  })

  $('.stopGame').on('click', function(){
    controller.stop()
  })

  $('.confirmDataEntry').on('click', function(e){
    e.preventDefault()
    var allPlayersArr = $('#playerinput').val().trim().split('\n');
    model.players = allPlayersArr
    view.playScreen()
  })

})


