var doWork;
var i;

var model = {
  players: ["Stanley", "Tommy", "Tom", "Tomm", "Stan"],
  won_players: [],
  isStop: false,
  currentWinner: null
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
  },
  reveilWinner: function() {
    var timeToTake = 5;
    var totalLength = model.players.length - 1;
    i = 0;
    var q = 0;
    if (totalLength < 1) return console.log('Players must be more than two')
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
  }
}

var controller = {
  playGame: function() {
    model.isStop = false
    view.injectPlayerContentToDom()
    // debugger
    console.log(model)
    view.reveilWinner()
  },
  stop: function(){
    model.isStop = true;
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

})