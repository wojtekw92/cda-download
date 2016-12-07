chrome.runtime.onMessage.addListener(function(request, sender) {

  if (request.action == "getSource") {
    var message = document.querySelector('#status');
    var items=[];
    for(var i=0;i<request.source.length;i++) {
      var item = request.source[i].replace(/\'/g,'').replace(/\"/g,'');
      if(items.indexOf(item)==-1) items.push(item);
    }
    var content = '';
    for(var i=0;i<items.length;i++) {
      content += '<a href="'+items[i]+'" download="'+items[i].match(/\w*\.mp4/)[0]+'">'+items[i].match(/\w*\.mp4/)[0]+'</a><img src="lock.png"></br>';
    }
    content += '';
    message.innerHTML = content;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#status');

  chrome.tabs.executeScript(null, {
    file: "getLinks.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
