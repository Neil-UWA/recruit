// CommentCoreLibrary (//github.com/jabbany/CommentCoreLibrary) - Licensed under the MIT license

$(document).on('ready', function(){
  $('#msg').width($('#background').width()*0.20);

  $('#send').on('load', function(){
    $('#msg').height($('#send').height()*0.8);
  });

  $('#background').on('load', function(){
    $('#stage').height($('#background').height());
  });

  if ($(document).width() < 1080) {
    $('#msg').css({width: "80%"});
  }

  $(window).on('resize', function(e){
    if ($(document).width() > 1080) {
      $('#msg').width($('#background').width()*0.20);
    } else {
      $('#msg').css({width: "80%"});
    }
    $('#msg').height($('#send').height()*0.8);
    $('#stage').height($('#background').height());
  });

  var socket = io();
  var cm = new CommentManager(document.getElementById('danmu'));

  cm.options.global.scale = 5;
  cm.options.scroll.scale = 2;

  cm.init();
  cm.start();

  socket.on('danmu', function(danmu){
    cm.send(danmu);
  });

  function sendDanmu(e){
    e.preventDefault();
    var danmu = {
      "mode": 1,
      "stime": + 10,
      "size": 25,
      "color": "0xffffff",
      "text": $('#msg').val(),
    }
    $('#msg').val('');
    socket.emit('danmu', danmu);
    $.post(window.location.href + 'api/danmus', danmu)
  }
  $('#send').on('click', sendDanmu);
  $('form').on('submit', sendDanmu);

  function fetchDanmus(){
    if (cm.runline.length) {return;}

    $.ajax({
      url: window.location.origin + '/api/danmus?filter=%7B%22order%22%3A%20%22stime%20DESC%22%7D',
      success: function(data){
        data.forEach(function(danmu){
          (function(danmu){
            setTimeout(function(){
              danmu.color = '0x' + parseInt(danmu.color).toString(16);
              cm.send(danmu);
            }, Math.random() * 100000 + 3000);
          })(danmu);
        });
      }
    });
  }

  setInterval(fetchDanmus, 5000);
});
