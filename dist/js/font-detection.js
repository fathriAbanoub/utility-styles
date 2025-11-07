(function () {
  function isFontLoaded(fontFamily) {
    const testElement = document.createElement("span");
    testElement.style.position = "absolute";
    testElement.style.visibility = "hidden";
    testElement.style.fontSize = "100px";
    testElement.textContent = "mmmmmmmmmmlli";

    testElement.style.fontFamily = `'${fontFamily}', monospace`;
    document.body.appendChild(testElement);

    const targetWidth = testElement.offsetWidth;

    testElement.style.fontFamily = "monospace";
    const fallbackWidth = testElement.offsetWidth;

    document.body.removeChild(testElement);

    return targetWidth !== fallbackWidth;
  }

  function updateFontVariables(category, fontKey, fontName) {
    const root = document.documentElement;

    if (isFontLoaded(fontName)) {
      root.style.setProperty(`--${category}-${fontKey}-loaded`, "1");
      root.classList.add(`${category}-${fontKey}-loaded`);
    }
  }

  const categories = ["ui", "ecommerce", "blog", "code"];

  categories.forEach((category) => {
    const fonts = {
      ui: {
        primary: "Inter",
        secondary: "Roboto",
        tertiary: "Poppins",
      },
      ecommerce: {
        primary: "Montserrat",
        secondary: "Lato",
        tertiary: "Nunito",
      },
      blog: {
        primary: "Merriweather",
        secondary: "Lora",
        tertiary: "Crimson Text",
      },
      code: {
        primary: "Fira Code",
        secondary: "JetBrains Mono",
        tertiary: "Source Code Pro",
      },
    };

    Object.keys(fonts[category]).forEach((key) => {
      updateFontVariables(category, key, fonts[category][key]);
    });
  });

  setTimeout(() => {
    categories.forEach((category) => {
      const root = document.documentElement;
      root.classList.add(`${category}-font-fallback-ready`);
    });
  }, 3000);
})();

// Navigation Mobile Menu Toggles
document.addEventListener("DOMContentLoaded", function () {
  // E-commerce Navigation 1 Mobile Toggle
  const eNav1Toggle = document.querySelector(".e-nav-1-mobile-toggle");
  const eNav1MobileMenu = document.querySelector(".e-nav-1-mobile-menu");

  if (eNav1Toggle && eNav1MobileMenu) {
    eNav1Toggle.addEventListener("click", function () {
      eNav1MobileMenu.classList.toggle("active");
    });
  }

  // E-learning Navigation 1 Mobile Toggle
  const elNav1Toggle = document.querySelector(".el-nav-1-mobile-toggle");
  const elNav1MobileMenu = document.querySelector(".el-nav-1-mobile-menu");

  if (elNav1Toggle && elNav1MobileMenu) {
    elNav1Toggle.addEventListener("click", function () {
      elNav1MobileMenu.classList.toggle("active");
    });
  }

  // Vendor Dashboard Navigation 1 Mobile Toggle
  const vdNav1Toggle = document.querySelector(".vd-nav-1-mobile-toggle");
  const vdNav1Sidebar = document.querySelector(".vd-nav-1-sidebar");
  const vdNav1Overlay = document.querySelector(".vd-nav-1-overlay");

  if (vdNav1Toggle && vdNav1Sidebar && vdNav1Overlay) {
    vdNav1Toggle.addEventListener("click", function () {
      vdNav1Sidebar.classList.toggle("active");
      vdNav1Overlay.classList.toggle("active");
    });

    vdNav1Overlay.addEventListener("click", function () {
      vdNav1Sidebar.classList.remove("active");
      vdNav1Overlay.classList.remove("active");
    });
  }

  // Vendor Dashboard Navigation 2 Mobile Toggle
  const vdNav2Toggle = document.querySelector(".vd-nav-2-mobile-toggle");
  const vdNav2Menu = document.querySelector(".vd-nav-2-menu");

  if (vdNav2Toggle && vdNav2Menu) {
    vdNav2Toggle.addEventListener("click", function () {
      vdNav2Menu.classList.toggle("active");
    });
  }
});
