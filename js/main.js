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
  p.textContent = entry.description;
  var $ul = document.querySelector('ul');
  $ul.appendChild(li);
  li.appendChild(divRow);
  divRow.appendChild(divColumnHalf);
  divColumnHalf.appendChild(img);
  divRow.appendChild(divColumnHalf2);
  divColumnHalf2.appendChild(h2);
  divColumnHalf2.appendChild(p);
  return $ul;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    renderEntries(data.entries[i]);
  }
});

/*
  <li>
    <div class="row">
      <div class="column-half">
        <img src="images/placeholder-image-square.jpg">
      </div>
      <div class="column-half">
        <h2>Ada Lovelace</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem pariatur assumenda,
          vero iste consectetur minus a laborum maiores nihil itaque aliquid eius eligendi sint id
          beatae voluptates, recusandae ullam laudantium!
        </p>
      </div>
    </div>
  </li>
*/
