// Кнопка называет ФАЙЛ, а не «страницу релизов»: человек, пришедший скачать, не
// должен выбирать между четырьмя архивами, не зная, какой из них его.
//
// Скрипт один на обе версии страницы — русскую и английскую: правила, по которым
// ищется файл своей системы, меняются вместе с именами в релизе, и две копии
// разошлись бы ровно на следующем переименовании. Язык берётся у <html lang>.
(function () {
  const РЕПО = 'ilyabazhenov/imp-agent-crossplatform-releases';
  const кнопка = document.getElementById('download');
  const версия = document.getElementById('version');

  const СЛОВА = {
    ru: {
      'mac-arm': 'Скачать для Mac (Apple Silicon)',
      'mac-intel': 'Скачать для Mac (Intel)',
      win: 'Скачать для Windows',
      other: 'Скачать',
      версия: 'Версия ',
      мегабайт: ' МБ',
      прошлый: ' · в прошлом релизе',
    },
    en: {
      'mac-arm': 'Download for Mac (Apple Silicon)',
      'mac-intel': 'Download for Mac (Intel)',
      win: 'Download for Windows',
      other: 'Download',
      версия: 'Version ',
      мегабайт: ' MB',
      прошлый: ' · in the previous release',
    },
  };
  const слова = СЛОВА[document.documentElement.lang] || СЛОВА.ru;

  const система = (function () {
    const данные = navigator.userAgentData;
    const строка = navigator.userAgent;
    const платформа = (данные && данные.platform) || navigator.platform || '';
    // Телефон и планшет — раньше Мака: iPhone пишет в user-agent «like Mac OS X»,
    // а iPad и вовсе выдаёт себя за Mac (MacIntel) и отличается только касаниями.
    // Ставить на них нечего, и кнопка «Скачать для Mac» там была бы враньём.
    if (/iPhone|iPad|iPod|Android/i.test(строка) || (данные && данные.mobile)) return 'other';
    if (/Mac/i.test(платформа) && (navigator.maxTouchPoints || 0) > 1) return 'other';
    if (/Win/i.test(платформа) || /Windows/i.test(строка)) return 'win';
    if (/Mac/i.test(платформа) || /Mac OS X/i.test(строка)) {
      // Apple Silicon не признаётся в user-agent: Safari и Chrome одинаково пишут
      // «Intel Mac OS X». Отличаем по числу ядер — у M-серии их 8 и больше.
      return (navigator.hardwareConcurrency || 0) >= 8 ? 'mac-arm' : 'mac-intel';
    }
    return 'other';
  })();

  кнопка.textContent = слова[система];

  const ищем = {
    'mac-arm': (имя) => /arm64-mac\.zip$/i.test(имя),
    'mac-intel': (имя) => /-mac\.zip$/i.test(имя) && !/arm64/i.test(имя),
    win: (имя) => /\.exe$/i.test(имя),
    other: () => false,
  };

  fetch('https://api.github.com/repos/' + РЕПО + '/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then((ответ) => (ответ.ok ? ответ.json() : Promise.reject(ответ.status)))
    .then((релиз) => {
      const файлы = релиз.assets || [];
      const найти = (правило) => файлы.find((файл) => правило(файл.name));
      const мой = найти(ищем[система]);
      if (мой) кнопка.href = мой.browser_download_url;
      версия.textContent = слова.версия + String(релиз.tag_name || '').replace(/^v/, '');

      const поставить = (узел, правило, размер) => {
        if (!узел) return;
        const файл = найти(правило);
        // Файла этой системы в последнем релизе может не быть вовсе — не каждая
        // версия выходит для обеих. Тогда ссылка ведёт в СПИСОК релизов, а не на
        // последний: в нём нужного файла нет, и человек упрётся в ту же пустоту.
        if (!файл) {
          узел.href = 'https://github.com/' + РЕПО + '/releases';
          const нет = узел.querySelector('.what');
          if (нет) нет.textContent = нет.textContent + слова.прошлый;
          return;
        }
        узел.href = файл.browser_download_url;
        const что = узел.querySelector('.what');
        if (что && размер) что.textContent = что.textContent + ' · ' + размер(файл);
      };
      const мегабайты = (файл) => Math.round(файл.size / 1048576) + слова.мегабайт;
      const маки = document.querySelectorAll('#mac-files .file');
      поставить(маки[0], ищем['mac-arm'], мегабайты);
      поставить(маки[1], ищем['mac-intel'], мегабайты);
      поставить(document.querySelector('#win-files .file'), ищем.win, мегабайты);
    })
    // Не достучались до GitHub — ссылки остаются на страницу последнего релиза,
    // то есть кнопка работает и без этого запроса.
    .catch(() => {
      кнопка.href = 'https://github.com/' + РЕПО + '/releases/latest';
    });
})();
