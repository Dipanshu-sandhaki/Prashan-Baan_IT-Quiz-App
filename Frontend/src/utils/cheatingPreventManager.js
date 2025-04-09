export const cheatingPrevention = (onCheatingDetected) => {
    // 🔹 Tab switch or minimize
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        onCheatingDetected("❌ Tab switch or window minimized detected.");
      }
    });
  
    // 🔹 Losing window focus
    window.addEventListener("blur", () => {
      onCheatingDetected("❌ Window focus lost (Alt+Tab or clicked outside).");
    });
  
    // 🔹 Exit fullscreen
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        onCheatingDetected("❌ Fullscreen mode exited.");
      }
    });
  
    // 🔹 Developer tools and shortcuts
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I")
      ) {
        event.preventDefault();
        onCheatingDetected("❌ Dev tools or Inspect Element attempt.");
      }
  
      if (event.altKey && event.key === "Tab") {
        onCheatingDetected("❌ Alt+Tab detected.");
      }
    });
  
    // 🔹 Detect external monitor
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter((d) => d.kind === "videoinput");
      if (videoInputs.length > 1) {
        onCheatingDetected("❌ Multiple monitors detected.");
      }
    });
  
  };
  