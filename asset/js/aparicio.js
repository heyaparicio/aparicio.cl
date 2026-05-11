document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initStickyHeader();
    initNoiseEffect();
    initRotatingText();
  });
  
  /* -----------------------------------
   1. Cursor personalizado + efecto magnético
----------------------------------- */
function initCursor() {
  const cursor = document.querySelector('#cursor');
  if (!cursor) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let initialized = false;

  cursor.style.opacity = '0';

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function setInitialPosition(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
    initialized = true;
  }

  document.addEventListener('mouseenter', setInitialPosition);

  window.addEventListener('mousemove', (e) => {
    if (!initialized) setInitialPosition(e);
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animateCursor() {
    cursorX = lerp(cursorX, mouseX, 0.15);
    cursorY = lerp(cursorY, mouseY, 0.15);
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mousedown', () => {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(1.5)`;
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(1)`;
  });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('magnet'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('magnet'));
  });
}
  

  /* -----------------------------------
     2. Mostrar/ocultar navbar al hacer scroll
  ----------------------------------- */

function initStickyHeader() {
  const header = document.querySelector(".navbar");
  const body = document.body;
  let lastScroll = 0;
  let isVisible = false;

  function updateNavbar() {
    const currentScroll = window.scrollY;
    const headerHeight = header.offsetHeight;

    if (currentScroll <= 0) {
      header.classList.remove("scrolled", "fixed-top", "nav-hide", "navbar-transitioning");
      body.style.paddingTop = "0";
      isVisible = false;
      lastScroll = currentScroll;
      return;
    }

    if (currentScroll > headerHeight) {
      if (lastScroll - currentScroll > 20) {
        if (!isVisible) {
          header.classList.add("fixed-top");
          body.style.paddingTop = `${headerHeight}px`;
          requestAnimationFrame(() => {
            header.classList.add("scrolled");
            header.classList.remove("nav-hide");
            isVisible = true;
          });
        }
      } else if (currentScroll - lastScroll > 20) {
        if (isVisible) {
          header.classList.add("nav-hide");
          header.classList.remove("scrolled");
          isVisible = false;
        }
      }
    } else {
      header.classList.remove("scrolled", "fixed-top", "nav-hide", "navbar-transitioning");
      body.style.paddingTop = "0";
      isVisible = false;
    }

    lastScroll = currentScroll;
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();
}
  
  
  /* -----------------------------------
     3. Efecto de ruido animado sobre imágenes
  ----------------------------------- */
  function initNoiseEffect() {
  const images = document.querySelectorAll('.main-image');
  const canvases = document.querySelectorAll('.noise-overlay');

  if (images.length !== canvases.length) {
    console.warn("Las cantidades de imágenes y canvas no coinciden.");
    return;
  }

  images.forEach((image, index) => {
    const canvas = canvases[index];
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let offsetX = 0;
    let offsetY = 0;
    const movementSpeed = 0.2;

    function generateNoise() {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 30;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    function updateNoisePosition() {
      offsetX += (Math.random() - 0.5) * movementSpeed;
      offsetY += (Math.random() - 0.5) * movementSpeed;
      offsetX = Math.max(-2, Math.min(2, offsetX));
      offsetY = Math.max(-2, Math.min(2, offsetY));
      canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    function animateNoise() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      generateNoise();
      updateNoisePosition();
    }

    // ✅ CAMBIO: esperar dimensiones reales antes de inicializar
    function startNoise() {
      if (image.clientWidth === 0 || image.clientHeight === 0) return;
      canvas.width = image.clientWidth;
      canvas.height = image.clientHeight;
      setInterval(animateNoise, 100);
    }

    if (image.complete) {
      startNoise();
    } else {
      image.addEventListener('load', startNoise);
    }
  });
}
  
  /* -----------------------------------
     4. Texto rotativo animado (.word)
  ----------------------------------- */
  function initRotatingText() {
    const words = document.querySelectorAll(".word");
    if (!words.length) return;
  
    words.forEach(word => {
      const letters = word.textContent.split("");
      word.textContent = "";
      letters.forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
      });
    });
  
    let currentWordIndex = 0;
    const maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";
  
    function rotateText() {
      const currentWord = words[currentWordIndex];
      const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  
      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          letter.className = "letter out";
        }, i * 80);
      });
  
      nextWord.style.opacity = "1";
      Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
          letter.className = "letter in";
        }, 340 + i * 80);
      });
  
      currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    }
  
    rotateText();
    setInterval(rotateText, 4000);
  }
  