// CommentCoreLibrary (//github.com/jabbany/CommentCoreLibrary) - Licensed under the MIT license

$('#msg').width($('#background').width());
$(window).on('resize', function(e){
  $('#msg').width($('#background').width());
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

$('form').on('submit', function(e){
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
});

function fetchDanmus(){
  if(!cm.runline.length){
    $.ajax({
      url: window.location.href + 'api/danmus',
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
  }else {
    return;
  }
}

setInterval(fetchDanmus, 10000);
