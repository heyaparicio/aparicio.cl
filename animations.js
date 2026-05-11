/* ============================================================
   ANIMATIONS.JS — IntersectionObserver para entradas en scroll
   Reemplaza AOS. Sin dependencias externas.
   Cargar con defer al final del <body> o en <head> con defer
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     CONFIGURACIÓN
     threshold  → % del elemento visible que dispara la animación
     rootMargin → margen del viewport (negativo = dispara antes
                  de llegar al borde, positivo = después)
  ---------------------------------------------------------- */

  const CONFIG = {
    threshold:  0.12,
    rootMargin: '0px 0px -48px 0px',
  };


  /* ----------------------------------------------------------
     OBSERVER
     Añade .is-visible cuando el elemento entra al viewport.
     Se desuscribe después del primer disparo — cada elemento
     se anima una sola vez y el observer no hace trabajo extra.
  ---------------------------------------------------------- */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, CONFIG);


  /* ----------------------------------------------------------
     REGISTRO
     Observa todos los elementos con [data-reveal] en el DOM.
     Usa DOMContentLoaded para garantizar que el HTML
     esté listo antes de buscar los elementos.
  ---------------------------------------------------------- */

  function init() {
    const elements = document.querySelectorAll('[data-reveal]');

    if (!elements.length) return;

    elements.forEach((el) => observer.observe(el));
  }


  /* ----------------------------------------------------------
     INIT — espera a que el DOM esté disponible
  ---------------------------------------------------------- */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
