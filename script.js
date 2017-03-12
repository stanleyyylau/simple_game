var model = {
  players: ["Stanley", "Yvonne", "Stan", "Von", "Stanvon"],
  won_players: [],
  current_winner: null
}

var view = {
  generateViewByPlayer: function(){
    var tpl = "<div class='player'>%name</div>";
    var result = "";
    model.players.forEach(function(value){
      result += tpl.replace('%name', value)
    })
    return result;
  },
  injectPlayerContentToDom: function(){
    var wrapper = $('.play-wrap');
   wrapper.html('');
   $('.play-wrap').html(view.generateViewByPlayer())
  },
  displayWinner: function(){
    $('.play-wrap .player').eq(model.current_winner).addClass('active')
  }
}

var controller = {
  playGame: function(){
    view.injectPlayerContentToDom()
    var totalLength = model.players.length;
    var ramdomNum;
    do {
      ramdomNum = Math.floor(Math.random() * totalLength)
    } while (model.won_players.indexOf(ramdomNum) != -1)
    model.current_winner = ramdomNum;
    model.won_players.push(model.current_winner)
    view.displayWinner()
  }
}
