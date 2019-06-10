// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Star Wars</h1>`;
var div = document.getElementById('list');
var ul = document.createElement('ul');
div.appendChild(ul);

appDiv.onclick = showMainInfo();

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://swapi.co/api/films/', false);
// xhr.send();
// if (xhr.status != 200) {
//   alert(xhr.status + ': ' + xhr.statusText);
// }
// else {
//   var json = JSON.parse(xhr.responseText);
//   var res = '';

//   for (var i = 0; i <= json.results.length - 1; i++) {
//     var filmName = json.results[i].title;
//     var filmEpisodeId = json.results[i].episode_id;
//     var filmOpeningCrawl = json.results[i].opening_crawl;
//     var filmDirector = json.results[i].director;
//     var filmProducer = json.results[i].producer;
//     var filmReleaseDate = json.results[i].release_date;
//     var li = document.createElement('li');
//     li.id = json.results[i].url;
//     li.onclick = function() { showModalWin() }

//     res = '<i>Name: </i>' + '<a href="#">' + json.results[i].title + '</a>' + '<br/>' +
//       '<i>Episode number: </i>' + filmEpisodeId + '<br/>' +
//       '<i>Description: </i>' + filmOpeningCrawl + '<br/>' +
//       '<i>Director: </i>' + filmDirector + '<br/>' +
//       '<i>Producer: </i>' + filmProducer + '<br/>' +
//       '<i>Release Date: </i>' + filmReleaseDate + '<br/><br/>';
//     li.innerHTML = res;
//     ul.appendChild(li);
//   }
// }


function getJSON(url) 
{
  var resp = '';
  var xhr = new XMLHttpRequest();
  if (xhr !== null) 
  {
    xhr.open("GET", url, false);
    xhr.send();
    resp = xhr.responseText;
  }
  return resp;
}

function showMainInfo()
{
  var json = getJSON('https://swapi.co/api/films/');
  var parsed = JSON.parse(json);
  var statement = "";
  for (var i = 0; i <= parsed.results.length - 1; i++) 
  {
    var filmName = parsed.results[i].title;
    var filmEpisodeId = parsed.results[i].episode_id;
    var filmOpeningCrawl = parsed.results[i].opening_crawl;
    var filmDirector = parsed.results[i].director;
    var filmProducer = parsed.results[i].producer;
    var filmReleaseDate = parsed.results[i].release_date;
    var li = document.createElement('li');
    li.id = parsed.results[i].url;
    li.onclick = function() { showModalWin() }

    statement = '<i>Name: </i>' + '<a href="#">' + parsed.results[i].title + '</a>' + '<br/>' +
      '<i>Episode number: </i>' + filmEpisodeId + '<br/>' +
      '<i>Description: </i>' + filmOpeningCrawl + '<br/>' +
      '<i>Director: </i>' + filmDirector + '<br/>' +
      '<i>Producer: </i>' + filmProducer + '<br/>' +
      '<i>Release Date: </i>' + filmReleaseDate + '<br/><br/>';
    li.innerHTML = statement;
    ul.appendChild(li);
  }
}

function showModalWin() 
{
  var darkLayer = document.createElement('div'); // слой затемнения
  darkLayer.id = 'shadow'; // id чтобы подхватить стиль
  document.body.appendChild(darkLayer); // включаем затемнение
  var modalWin = document.getElementById('popupWin'); // находим наше "окно"
  modalWin.style.display = 'block'; // "включаем" его
  darkLayer.onclick = function () // при клике на слой затемнения все исчезнет
  {  
  darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
  modalWin.style.display = 'none'; // делаем окно невидимым
  return false;
  };
}