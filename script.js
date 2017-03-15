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
    console.log('the winnder index is ', winnerIndex)
    console.log('and the winner name is ', model.players[winnerIndex])
    console.log('im printing out the won players just for your reference', model.won_players)
    view.renderWinnerList()
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
    var timeToTake = 5;
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
      $('.logo').hide()
      $('.dataEntry').hide()
      $('.play-wrap').show()
      $('.winner-list').show()
      $('.play-wrap').css('display', 'flex')
      $('.control-wrap').show()
      $('.control-wrap').css('display', 'flex')
    }, 4000)
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

  $('.confirmDataEntry').on('click', function(e){
    e.preventDefault()
    var allPlayersArr = $('#playerinput').val().trim().split('\n');
    model.players = allPlayersArr
    view.playScreen()
  })

})