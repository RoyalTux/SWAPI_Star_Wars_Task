import './style.css';

const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Star Wars</h1>`;
var div = document.getElementById('list');
var ul = document.createElement('ul');
div.appendChild(ul);

showMainInfo();

function showMainInfo(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://swapi.co/api/films/');
  xhr.send();

  xhr.onload = function() {
  if (xhr.status != 200) {
    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
  } 
  else {
    console.log(`Done, got ${xhr.response.length} bytes`);
    var parsed = JSON.parse(xhr.responseText);
    for (var i = 0; i <= parsed.results.length - 1; i++) {
      var li = document.createElement('li');

      li.innerHTML = '<i>Name: </i>' + 
        '<a id ="' + parsed.results[i].url + '"href="#">' + parsed.results[i].title + '</a>' + '<br/>' +
          '<i>Episode number: </i>' + parsed.results[i].episode_id + '<br/>' +
          '<i>Description: </i>' + parsed.results[i].opening_crawl + '<br/>' +
          '<i>Director: </i>' + parsed.results[i].director + '<br/>' +
          '<i>Producer: </i>' + parsed.results[i].producer + '<br/>' +
          '<i>Release Date: </i>' + parsed.results[i].release_date + '<br/><br/><hr></hr><br/>';
      ul.appendChild(li);

      (function (index) {
          li.onclick = function() { moreInfo(parsed.results[index].url) }
        }(i));

      }
    }
  };

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      console.log(`Received ${event.loaded} of ${event.total} bytes`);
    }
    else{
      console.log(`Received ${event.loaded} bytes`);
    }
  };

  xhr.onerror = function() {
    console.log("Request failed");
  };
}

function moreInfo(url){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    } 
    else {
      console.log(`Done, got ${xhr.response.length} bytes`);
      var parsed = JSON.parse(xhr.responseText);
      var leftContent = document.getElementById("leftContent");
      leftContent.innerHTML = "";
      var rightContent = document.getElementById("rightContent");
      rightContent.innerHTML = "";

      for (var i = 0; i <= parsed.characters.length - 1; i++) {    
        let xhr = new XMLHttpRequest();
        xhr.open('GET', parsed.characters[i]);
        xhr.send();

        xhr.onload = function() {
          if (xhr.status != 200) {
          console.log(`Error ${xhr.status}: ${xhr.statusText}`);
          } 
          else {
            console.log(`Done, got ${xhr.response.length} bytes`);
            let people = JSON.parse(xhr.responseText);
            leftContent.innerHTML += "<h4>" + people.name + "</h4>";
            rightContent.innerHTML += "<h4>" + people.gender + "</h4>";
          }
        };

        xhr.onprogress = function(event) {
          if (event.lengthComputable) {
            console.log(`Received ${event.loaded} of ${event.total} bytes`);
          }
          else{
            console.log(`Received ${event.loaded} bytes`);
          }
        };

        xhr.onerror = function() {
          console.log("Request failed");
        };
      }
    }
  };

  showModalWin();

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      console.log(`Received ${event.loaded} of ${event.total} bytes`);
    }
    else{
      console.log(`Received ${event.loaded} bytes`);
    }
  };
  
  xhr.onerror = function() {
    console.log("Request failed");
  };
}

function showModalWin() {
  var darkLayer = document.createElement('div'); 
  darkLayer.id = 'shadow'; 
  document.body.appendChild(darkLayer);
  var modalWin = document.getElementById('popupWin'); 
  modalWin.style.display = 'block'; 
  darkLayer.onclick = function (){  
    darkLayer.parentNode.removeChild(darkLayer); 
    modalWin.style.display = 'none'; 
    return false;
  };
}
