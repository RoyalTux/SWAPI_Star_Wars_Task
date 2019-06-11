// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Star Wars</h1>`;
var div = document.getElementById('list');
var ul = document.createElement('ul');
div.appendChild(ul);

showMainInfo();

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
  for (var i = 0; i <= parsed.results.length - 1; i++) 
  {
    var li = document.createElement('li');
  
    li.innerHTML = '<i>Name: </i>' + 
    '<a id ="' + parsed.results[i].url + '"href="#">' + parsed.results[i].title + '</a>' + '<br/>' +
      '<i>Episode number: </i>' + parsed.results[i].episode_id + '<br/>' +
      '<i>Description: </i>' + parsed.results[i].opening_crawl + '<br/>' +
      '<i>Director: </i>' + parsed.results[i].director + '<br/>' +
      '<i>Producer: </i>' + parsed.results[i].producer + '<br/>' +
      '<i>Release Date: </i>' + parsed.results[i].release_date + '<br/><br/>';
    ul.appendChild(li);

    (function (index) {
      li.onclick = function() { moreInfo(parsed.results[index].url) }
    }(i));
  }
}

function moreInfo(url)
{
  var json = getJSON(url); 
  var parsed = JSON.parse(json);
  var leftContent = document.getElementById("leftContent");
  leftContent.innerHTML = "";
  var rightContent = document.getElementById("rightContent");
  rightContent.innerHTML = "";
  for (var i = 0; i <= parsed.characters.length - 1; i++)
  {
    var peopleJSON = getJSON(parsed.characters[i]);
    var people = JSON.parse(peopleJSON);
    //console.log(people.name);
    //console.log(people.gender);
    leftContent.innerHTML += "<h4>" + people.name + "</h4>";
    rightContent.innerHTML += "<h4>" + people.gender + "</h4>";

  }
  showModalWin();
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
