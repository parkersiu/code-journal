var $photoURL = document.getElementById('url');
var $image = document.getElementById('image');
var $form = document.getElementById('form');
var $new = document.getElementById('new');
var $entries = document.getElementById('entries');
var $navEntries = document.getElementById('nav-entries');
var $entriesForm = document.getElementById('entry-form');
var $ul = document.getElementById('entrylist');
var $formTitle = document.getElementById('form-title');
var $deleteAnchor = document.getElementById('edit-anchor');
var $popup = document.getElementById('popup');
var $cancelButton = document.getElementById('cancel');
var $confirmButton = document.getElementById('confirm');

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
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.nextEntryId === data.entries[i].nextEntryId) {
        data.entries[i].title = $form.elements.title.value;
        data.entries[i].url = $form.elements.url.value;
        data.entries[i].notes = $form.elements.notes.value;
        var $currentLi = document.getElementById(data.entries[i].nextEntryId);
        $currentLi.replaceWith(renderEntries(data.entries[i]));
      }
    } data.editing = null;
  } else {
    data.entries.unshift(values);
    $ul.prepend(renderEntries(values));
    data.nextEntryId++;
  }
  $image.setAttribute('src', '');
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
  var icon = document.createElement('i');
  icon.className = 'fa-solid fa-pencil';
  li.appendChild(divRow);
  divRow.appendChild(divColumnHalf);
  divColumnHalf.appendChild(img);
  divRow.appendChild(divColumnHalf2);
  divColumnHalf2.appendChild(h2);
  divColumnHalf2.appendChild(icon);
  divColumnHalf2.appendChild(p);
  li.setAttribute('data-entry-id', entry.nextEntryId);
  li.setAttribute('id', entry.nextEntryId);
  return li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntries(data.entries[i]));
  }
  updateView(data.view);
});

$new.addEventListener('click', function (event) {
  $formTitle.textContent = 'New Entry';
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.elements.title.value = '';
  $form.elements.url.value = '';
  $form.elements.notes.value = '';
  updateView('entry-form');
  $deleteAnchor.className = 'hidden';
});

$navEntries.addEventListener('click', function (event) {
  updateView('entries');
  $deleteAnchor.className = 'hidden';
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

$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $entries.className = 'hidden';
    $entriesForm.className = '';
    $formTitle.textContent = 'Edit Entry';
    var $closest = event.target.closest('li');
    var $dataEntryIdValue = parseInt($closest.getAttribute('data-entry-id'));
    for (var i = 0; i < data.entries.length; i++) {
      if ($dataEntryIdValue === data.entries[i].nextEntryId) {
        data.editing = data.entries[i];
      }
    }
    $form.elements.title.value = data.editing.title;
    $form.elements.url.value = data.editing.url;
    $form.elements.notes.value = data.editing.notes;
    $image.setAttribute('src', data.editing.url);
    $deleteAnchor.className = '';
  }
});

$deleteAnchor.addEventListener('click', function (event) {
  $popup.className = '';
});

$popup.addEventListener('click', function (event) {
  if (event.target === $cancelButton) {
    $popup.className = 'hidden';
  } else if (event.target === $confirmButton) {
    removeEntry();
    updateView('entries');
    $popup.className = 'hidden';
  }
});

function removeEntry() {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === data.editing.nextEntryId) {
      data.entries.splice(i, 1);
      var $li = document.getElementById(data.editing.nextEntryId);
      $li.remove();
    }
  }
  data.editing = null;
}
