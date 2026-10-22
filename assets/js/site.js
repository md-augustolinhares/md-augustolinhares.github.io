// Troca a imagem de cada palco conforme o bloco lido e faz a entrada suave dos blocos.
// Sem JavaScript, a página continua completa: cada palco mostra a primeira imagem e nada fica escondido.
(function () {
  document.documentElement.classList.add('js');

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.rise').forEach(function (el) { el.classList.add('in'); });
    return;
  }

  document.querySelectorAll('.split').forEach(function (split) {
    var figures = split.querySelectorAll('.stage figure[data-stage]');
    if (!figures.length) return;

    function show(key) {
      figures.forEach(function (f) {
        var on = f.getAttribute('data-stage') === key;
        f.classList.toggle('on', on);
        f.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) show(e.target.getAttribute('data-stage'));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    split.querySelectorAll('.side [data-stage]').forEach(function (el) { observer.observe(el); });
  });

  var riseObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        riseObserver.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rise').forEach(function (el) { riseObserver.observe(el); });
})();
