// Navigation Mobile Menu Toggles with Error Handling
document.addEventListener("DOMContentLoaded", function () {
  
  function setupToggle(toggleSelector, targetSelector, overlaySelector = null) {
    try {
      const toggle = document.querySelector(toggleSelector);
      const target = document.querySelector(targetSelector);
      const overlay = overlaySelector ? document.querySelector(overlaySelector) : null;

      if (!toggle || !target) {
        return; // Elements not found, skip setup
      }

      toggle.addEventListener("click", function () {
        target.classList.toggle("active");
        if (overlay) {
          overlay.classList.toggle("active");
        }
      });

      if (overlay) {
        overlay.addEventListener("click", function () {
          target.classList.remove("active");
          overlay.classList.remove("active");
        });
      }
    } catch (error) {
      console.warn(`Navigation setup failed for ${toggleSelector}:`, error);
    }
  }

  // Setup all navigation toggles
  setupToggle(".e-nav-1-mobile-toggle", ".e-nav-1-mobile-menu");
  setupToggle(".el-nav-1-mobile-toggle", ".el-nav-1-mobile-menu");
  setupToggle(".vd-nav-1-mobile-toggle", ".vd-nav-1-sidebar", ".vd-nav-1-overlay");
  setupToggle(".vd-nav-2-mobile-toggle", ".vd-nav-2-menu");
});
