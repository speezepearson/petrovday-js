var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
window.onYouTubeIframeAPIReady = function() {
  console.log('ready');
  player = new YT.Player('explosion-yt');
  window.player = player;
}

var play = (() => player.playVideo());
export default play;
