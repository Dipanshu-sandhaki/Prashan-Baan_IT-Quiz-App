let cheatCount = 0;
const MAX_ATTEMPTS = 3;

export const startProctoring = (onCheating) => {
  const handlers = [];

  const add = (target, event, callback) => {
    target.addEventListener(event, callback);
    handlers.push(() => target.removeEventListener(event, callback));
  };

  const raiseCheat = (msg) => {
    cheatCount++;
    onCheating(msg);

    if (cheatCount >= MAX_ATTEMPTS) {
      onCheating("❌ Too many violations! Auto-submitting exam...");
    }
  };

  // -------------------------------
  // 1️⃣ Tab Switch Detection
  // -------------------------------
  add(document, "visibilitychange", () => {
    if (document.hidden) {
      raiseCheat("❌ Tab Switch Detected!");
    }
  });

  // -------------------------------
  // 2️⃣ Minimize (BLUR) detection
  // -------------------------------
  add(window, "blur", () => {
    raiseCheat("❌ Window Minimized / ALT+TAB Detected!");
  });

  // ===============================
  // 🔥 Fullscreen Enforcement (UNBREAKABLE)
  // ===============================
  let fsViolations = 0;

  const forceFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  // Detect exit and force re-enter
  add(document, "fullscreenchange", () => {
    if (!document.fullscreenElement) {
      fsViolations++;
      onCheating(`❌ Fullscreen exited! (Attempt ${fsViolations})`);

      setTimeout(forceFullscreen, 150);

      if (fsViolations >= 2) {
        onCheating("🚨 Multiple fullscreen exits detected!");
      }
    }
  });

  // -------------------------------
  // 4️⃣ Block DevTools
  // -------------------------------
  add(window, "keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "J") ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
      raiseCheat("❌ Developer Tools Attempt!");
    }
  });

  // -------------------------------
  // 5️⃣ Disable right click
  // -------------------------------
  add(document, "contextmenu", (e) => e.preventDefault());

  // -------------------------------
  // 6️⃣ Prevent Back Button
  // -------------------------------
  window.history.pushState(null, null, window.location.href);
  const preventBack = () => {
    raiseCheat("❌ Back Button Attempt!");
    window.history.pushState(null, null, window.location.href);
  };
  add(window, "popstate", preventBack);

  // -------------------------------
  // 7️⃣ Disable Refresh/Close
  // -------------------------------
  window.onbeforeunload = () =>
    "Exam in progress. Leaving is considered cheating.";

  // -------------------------------
  // 8️⃣ Block Copy / Paste / Select
  // -------------------------------
  add(document, "copy", (e) => {
    e.preventDefault();
    raiseCheat("❌ Copy Attempt Blocked!");
  });

  add(document, "paste", (e) => {
    e.preventDefault();
    raiseCheat("❌ Paste Attempt Blocked!");
  });

  add(document, "cut", (e) => {
    e.preventDefault();
    raiseCheat("❌ Cut Attempt Blocked!");
  });

  add(document, "selectstart", (e) => e.preventDefault());

  add(document, "keydown", (e) => {
    if (
      (e.ctrlKey && e.key === "c") ||
      (e.ctrlKey && e.key === "v") ||
      (e.ctrlKey && e.key === "x") ||
      (e.ctrlKey && e.key === "a")
    ) {
      e.preventDefault();
      raiseCheat("❌ Keyboard Copy/Paste Attempt!");
    }
  });

  // Cleanup method
  return () => {
    handlers.forEach((fn) => fn());
    window.onbeforeunload = null;
  };
};
