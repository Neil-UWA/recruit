// CommentCoreLibrary (//github.com/jabbany/CommentCoreLibrary) - Licensed under the MIT license

var socket = io();
var cm = new CommentManager(document.getElementById('danmu'));

cm.options.global.scale = 5;
cm.options.scroll.scale = 2;

cm.init();
cm.start();

socket.on('danmu', function(danmu){
  cm.send(danmu);
});

document.getElementsByTagName('form')[0].addEventListener('submit', function(e){
  e.preventDefault();
  var input = document.getElementById('msg');
  var danmu = {
    "mode": 1,
    "stime": Date.now + 10,
    "size": 25,
    "color": 0xffffff,
    "text": input.value,
  }
  input.value = '';
  socket.emit('danmu', danmu);
}, false);
