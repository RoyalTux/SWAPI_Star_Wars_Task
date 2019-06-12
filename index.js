import './style.css';

const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Star Wars</h1>`;
var div = document.getElementById('list');
var ul = document.createElement('ul');
div.appendChild(ul);

showMainInfo();

function showMainInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://swapi.co/api/films/');
  xhr.send();

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      return;
    }
    console.log(`Done, got ${xhr.response.length} bytes`);
    var parsed = JSON.parse(xhr.responseText);
    for (var i = 0; i <= parsed.results.length - 1; i++) {
      var li = document.createElement('li');
      var results = parsed.results[i];
      li.innerHTML = '<i>Name: </i>' +
        '<a id ="' + results.url + '"href="#">' + results.title + '</a>' + '<br/>' +
        '<i>Episode number: </i>' + results.episode_id + '<br/>' +
        '<i>Description: </i>' + results.opening_crawl + '<br/>' +
        '<i>Director: </i>' + results.director + '<br/>' +
        '<i>Producer: </i>' + results.producer + '<br/>' +
        '<i>Release Date: </i>' + results.release_date + '<br/><br/><hr></hr><br/>';
      ul.appendChild(li);

      var a = document.getElementById(results.url);
      (function (index) {
          a.onclick = function() { moreInfo(parsed.results[index].url) }
      }(i));
    }
  };

  xhr.onprogress = function (event) {
    if (event.lengthComputable) {
      console.log(`Received ${event.loaded} of ${event.total} bytes`);
    }
    else {
      console.log(`Received ${event.loaded} bytes`);
    }
  };

  xhr.onerror = function () {
    console.log("Request failed");
  };
}

function moreInfo(url) {
  var names = "";
  var genders = "";
  var leftContent = document.getElementById("leftContent");
  leftContent.innerHTML = "";
  var rightContent = document.getElementById("rightContent");
  rightContent.innerHTML = "";
  var loading = document.getElementById("loading");
  loading.innerHTML = "Loading...";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      return;
    }
    console.log(`Done, got ${xhr.response.length} bytes`);
    var parsed = JSON.parse(xhr.responseText);

    for (var i = 0; i <= parsed.characters.length - 1; i++) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', parsed.characters[i]);
      xhr.send();

      xhr.onload = function () {
        if (xhr.status != 200) {
          console.log(`Error ${xhr.status}: ${xhr.statusText}`);
          return;
        }
        console.log(`Done, got ${xhr.response.length} bytes`);
        var people = JSON.parse(xhr.responseText);
        names += "<h4>" + people.name + "</h4>";
        genders += "<h4>" + people.gender + "</h4>";
        loading.innerHTML = "";
        leftContent.innerHTML = "<h2> Character </h2>" + names;
        rightContent.innerHTML = "<h2> Gender </h2>" + genders;
      };

      xhr.onprogress = function (event) {
        if (event.lengthComputable) {
          console.log(`Received ${event.loaded} of ${event.total} bytes`);
        }
        else {
          console.log(`Received ${event.loaded} bytes`);
        }
      };

      xhr.onerror = function () {
        console.log("Request failed");
      };
    }
  };

  showModalWin();

  xhr.onprogress = function (event) {
    if (event.lengthComputable) {
      console.log(`Received ${event.loaded} of ${event.total} bytes`);
    }
    else {
      console.log(`Received ${event.loaded} bytes`);
    }
  };

  xhr.onerror = function () {
    console.log("Request failed");
  };
}

function showModalWin() {
  var darkLayer = document.createElement('div');
  darkLayer.id = 'shadow';
  document.body.appendChild(darkLayer);
  var modalWin = document.getElementById('popupWin');
  modalWin.style.display = 'block';
  darkLayer.onclick = function () {
    darkLayer.parentNode.removeChild(darkLayer);
    modalWin.style.display = 'none';
    return false;
  };
}
