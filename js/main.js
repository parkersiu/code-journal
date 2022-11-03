var $photoURL = document.getElementById('url');
var $image = document.getElementById('image');
var $form = document.getElementById('form');
var $new = document.getElementById('new');
var $entries = document.getElementById('entries');
var $navEntries = document.getElementById('nav-entries');
var $entriesForm = document.getElementById('entry-form');
var $ul = document.getElementById('entrylist');

$photoURL.addEventListener('input', function (event) {
  var $url = $form.elements.url.value;
  $image.setAttribute('src', $url);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var values = {};
  values.title = $form.elements.title.value;
  values.url = $form.elements.url.value;
  values.notes = $form.elements.notes.value;
  values.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(values);
  $image.setAttribute('src', '');
  $ul.prepend(renderEntries(values));
  $form.reset();
  updateView('entries');
});

function renderEntries(entry) {
  var li = document.createElement('li');
  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');
  var divColumnHalf = document.createElement('div');
  divColumnHalf.setAttribute('class', 'column-half');
  var img = document.createElement('img');
  img.setAttribute('src', entry.url);
  var divColumnHalf2 = document.createElement('div');
  divColumnHalf2.setAttribute('class', 'column-half');
  var h2 = document.createElement('h2');
  h2.textContent = entry.title;
  var p = document.createElement('p');
  p.textContent = entry.notes;
  li.appendChild(divRow);
  divRow.appendChild(divColumnHalf);
  divColumnHalf.appendChild(img);
  divRow.appendChild(divColumnHalf2);
  divColumnHalf2.appendChild(h2);
  divColumnHalf2.appendChild(p);
  return li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntries(data.entries[i]));
  }
  updateView(data.view);
});

$new.addEventListener('click', function (event) {
  updateView('entry-form');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
});

$navEntries.addEventListener('click', function (event) {
  updateView('entries');
});

function updateView(string) {
  data.view = string;
  if (data.view === 'entries') {
    $entries.className = '';
    $entriesForm.className = 'hidden';
  } else if (data.view === 'entry-form') {
    $entries.className = 'hidden';
    $entriesForm.className = '';
  }
}
