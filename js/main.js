var $photoURL = document.getElementById('url');

var $icon = document.getElementById('icon');

var $image = document.getElementById('image');

var $form = document.getElementById('form');

$photoURL.addEventListener('input', function (event) {
  var $url = $form.elements.url.value;
  $image.setAttribute('src', $url);
  $image.className = '';
  $icon.className = 'fa-regular fa-image hidden';
});
