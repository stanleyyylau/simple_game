var model = {
  players: ["Stanley", "Yvonne", "Stan", "Von", "Stanvon"],
  won_players: [],
  current_winner: null
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
  displayWinner: function() {
    $('.play-wrap .player').eq(model.current_winner).addClass('active')
  },
  reveilWinner: function() {
    var timeToTake = 5;
    var totalLength = model.players.length - 1;
    var firstPlayTime = new Date();
    var i = 0;
    var q = 0;
    var doWork = setInterval(function(){
      if((new Date() - firstPlayTime) > timeToTake * 1000){
        clearInterval(doWork)
        setTimeout(view.displayWinner, 0)
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
    view.injectPlayerContentToDom()
    var totalLength = model.players.length;
    var ramdomNum;
    do {
      ramdomNum = Math.floor(Math.random() * totalLength)
    } while (model.won_players.indexOf(ramdomNum) != -1)
    model.current_winner = ramdomNum;
    model.won_players.push(model.current_winner)
    // debugger
    view.reveilWinner()
  }
}
