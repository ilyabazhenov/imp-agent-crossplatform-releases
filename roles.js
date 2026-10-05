// Переключатель ролей на схеме. Один на русскую и английскую страницы: подпись под
// схемой лежит у самой кнопки (`data-legend`), поэтому слов в скрипте нет вовсе.
(function () {
  var map = document.getElementById('map');
  var legend = document.getElementById('legend');
  var roleA = document.getElementById('role-a');
  var roleB = document.getElementById('role-b');
  var catalog = document.getElementById('catalog');
  var buttons = document.querySelectorAll('.switch button');
  var known = {};
  buttons.forEach(function (b) {
    known[b.dataset.show] = b.dataset.legend;
  });
  function show(mode) {
    map.setAttribute('data-show', mode);
    legend.textContent = known[mode];
    roleA.classList.toggle('dim', mode === 'b');
    roleB.classList.toggle('dim', mode === 'a');
    catalog.setAttribute('data-show', mode);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.show === mode));
    });
    try {
      localStorage.setItem('roles-show', mode);
    } catch {
      // Приватное окно или запрет хранилища: выбор просто не запомнится.
    }
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      show(b.dataset.show);
    });
  });
  var saved = null;
  try {
    saved = localStorage.getItem('roles-show');
  } catch {
    // То же: без хранилища страница открывается на обеих ролях.
  }
  if (saved && known[saved]) show(saved);
})();
