var $photoURL = document.getElementById('url');

var $image = document.getElementById('image');

var $form = document.getElementById('form');

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
  data.entries.push(values);
  $image.setAttribute('src', '');
  $form.reset();
});
