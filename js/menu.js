/* Hamburger-Menü für schmale Bildschirme.
   Progressive Verbesserung: ohne JavaScript bleibt die Navigation
   sichtbar, die Klasse js-nav im <html> schaltet erst das Einklappen
   frei (sie wird inline im <head> gesetzt, damit nichts aufblitzt). */
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('hauptnavigation');

    if (!toggle || !nav) {
        document.documentElement.classList.remove('js-nav');
        return;
    }

    function setOpen(open) {
        if (open) {
            nav.setAttribute('data-open', '');
        } else {
            nav.removeAttribute('data-open');
        }
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
    }

    toggle.addEventListener('click', function () {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    /* Nach dem Sprung zu einem Abschnitt soll das Menü nicht offen
       stehen bleiben und den Inhalt verdecken. */
    nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
            setOpen(false);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            toggle.focus();
        }
    });

    /* Wird das Fenster auf Desktop-Breite gezogen, ist die Navigation
       ohnehin ausgeklappt — der Zustand wird zurückgesetzt. */
    window.matchMedia('(min-width: 701px)').addEventListener('change', function (event) {
        if (event.matches) {
            setOpen(false);
        }
    });
})();
