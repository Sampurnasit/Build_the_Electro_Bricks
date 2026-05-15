/* ════════════════════════════════════════════════════════════
   BUILD THE ELECTRO BRICKS — app.js
   ════════════════════════════════════════════════════════════ */

"use strict";

/* ════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════ */

const VALID_CODES = [
  "BEB2026"
];

// Track used codes within session (survives page navigation but not full reload)
const usedCodes = new Set();



/* ════════════════════════════════════════════════════════════
   TIMER CONFIG
   ════════════════════════════════════════════════════════════ */

const TIMER_DURATION_SECONDS = 30 * 60; // 30 minutes

/* ════════════════════════════════════════════════════════════
   UTILITIES
   ════════════════════════════════════════════════════════════ */

/**
 * Returns a random element from an array.
 */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Formats seconds into MM:SS string.
 */
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Shows a screen by id, hides all others.
 */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

/* ════════════════════════════════════════════════════════════
   LOADING SCREEN
   ════════════════════════════════════════════════════════════ */

(function initLoadingScreen() {
  const statuses = [
    "Initializing system...",
    "Loading question bank...",
    "Securing session...",
    "Ready.",
  ];
  const barEl = document.getElementById("loading-bar");
  const statusEl = document.getElementById("loading-status");
  let pct = 0;
  let statusIdx = 0;

  // Animate the loading bar from 0 → 100% over ~1.8s
  const interval = setInterval(() => {
    pct += 2.5;
    barEl.style.width = Math.min(pct, 100) + "%";

    // Update status text at certain points
    if (pct >= 30 && statusIdx === 0) { statusEl.textContent = statuses[1]; statusIdx = 1; }
    if (pct >= 60 && statusIdx === 1) { statusEl.textContent = statuses[2]; statusIdx = 2; }
    if (pct >= 90 && statusIdx === 2) { statusEl.textContent = statuses[3]; statusIdx = 3; }

    if (pct >= 100) {
      clearInterval(interval);
      // Verify Supabase Connection
      if (!window.supabaseClient) {
        statusEl.textContent = "⚠ Supabase Connection Failed!";
        statusEl.style.color = "var(--red)";
      } else {
        setTimeout(() => showScreen("screen-login"), 300);
      }
    }
  }, 45);
})();

/* ════════════════════════════════════════════════════════════
   LOGIN SCREEN
   ════════════════════════════════════════════════════════════ */

(function initLoginScreen() {
  const nameInput = document.getElementById("inp-name");
  const codeInput = document.getElementById("inp-code");
  const loginBtn = document.getElementById("btn-login");
  const errorEl = document.getElementById("login-error");

  function showError(msg) {
    errorEl.textContent = "⚠ " + msg;
    errorEl.classList.remove("hidden");
    // Re-trigger shake animation
    errorEl.style.animation = "none";
    void errorEl.offsetWidth; // reflow
    errorEl.style.animation = "";
  }

  function clearError() {
    errorEl.classList.add("hidden");
  }

  const leadModeBtn = document.getElementById("btn-lead-mode");

  leadModeBtn?.addEventListener("click", () => {
    isLeadMode = !isLeadMode;
    if (isLeadMode) {
      leadModeBtn.querySelector(".btn-text").textContent = "Switch to Standard Mode (Contestant)";
      loginBtn.querySelector(".btn-text").textContent = "Login as Team Lead";
      codeInput.parentElement.style.display = "none"; // Code not needed for lead
    } else {
      leadModeBtn.querySelector(".btn-text").textContent = "Switch to Team Lead Mode (Submission)";
      loginBtn.querySelector(".btn-text").textContent = "Login";
      codeInput.parentElement.style.display = "block";
    }
  });

  async function attemptLogin() {
    clearError();
    const name = nameInput.value.trim();
    const code = codeInput.value.trim().toUpperCase();

    if (!name) { showError("Please enter your team name."); nameInput.focus(); return; }

    if (isLeadMode) {
      // LEAD LOGIN: Check if team exists
      loginBtn.disabled = true;
      loginBtn.classList.add("loading");
      
      try {
        const { data, error } = await window.supabaseClient
          .from('team_assignments')
          .select('*')
          .ilike('name', name) // Case-insensitive search
          .order('created_at', { ascending: false }) // Get latest session if multiples exist
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          alert(`Team "${name}" not found. Ensure the contestants have picked a token on the PC first.`);
          showError("Team not found.");
          return;
        }
        
        globalUserName = data.name;
        globalUserCode = data.code;
        initLeadSubmission(data);
        showScreen("screen-lead-submission");
      } catch (err) {
        console.error("Lead Login Error:", err);
        alert("Database Error: " + err.message);
        showError("Database connection failed.");
      } finally {
        loginBtn.disabled = false;
        loginBtn.classList.remove("loading");
      }
      return;
    }

    // STANDARD LOGIN
    if (!code) { showError("Please enter your access code."); codeInput.focus(); return; }
    if (!VALID_CODES.includes(code)) { showError("Invalid access code."); codeInput.focus(); return; }
    if (usedCodes.has(code)) { showError("Code already used."); codeInput.focus(); return; }

    usedCodes.add(code);
    loginBtn.disabled = true;
    loginBtn.classList.add("loading");

    setTimeout(() => {
      globalUserName = name;
      globalUserCode = code;
      showScreen("screen-rules");
    }, 900);
  }

  loginBtn.addEventListener("click", attemptLogin);

  // Allow Enter key to submit
  [nameInput, codeInput].forEach((inp) => {
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") attemptLogin();
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   DASHBOARD
   ════════════════════════════════════════════════════════════ */

let timerInterval = null;
let globalUserName = "";
let globalUserCode = "";
let isLeadMode = false;
let leadDigitalImage = null;
let leadAnalogImage = null;
let activeCaptureType = null;
let currentStream = null;

const cameraModal = document.getElementById("camera-modal");
const cameraVideo = document.getElementById("camera-video");
const cameraCanvas = document.getElementById("camera-canvas");
const btnCapture = document.getElementById("btn-capture");
const btnCloseCamera = document.getElementById("close-camera");
const MAX_WARNINGS = 3;
let hasSubmittedAtLeastOne = false;
let tabWarnings = 0;

async function unlockToken() {
  if (window.supabaseClient && globalUserName && globalUserCode) {
    // Mark as inactive instead of deleting to preserve record for admin
    await window.supabaseClient
      .from('team_assignments')
      .update({ warnings: -1 }) // Using -1 in warnings to signify "Left/Inactive"
      .match({ name: globalUserName, code: globalUserCode });
  }
}

document.getElementById("btn-enter-contest")?.addEventListener("click", () => {
  initTokenSelection();
  showScreen("screen-tokens");
  tryRequestFullscreen();
});

async function initTokenSelection() {
  const grid = document.getElementById("tokens-grid");
  const isRefresh = grid.children.length === 10 && !grid.querySelector(".loading");

  if (!isRefresh) {
    grid.innerHTML = "";
    // Show loading state on buttons
    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement("button");
      btn.className = "token-btn loading";
      btn.textContent = i;
      btn.setAttribute("data-token", i);
      btn.disabled = true;
      grid.appendChild(btn);
    }
  }

  // Fetch taken tokens from Supabase (Only active ones)
  let takenTokens = [];
  if (window.supabaseClient) {
    try {
      const { data, error } = await window.supabaseClient
        .from('team_assignments')
        .select('token_id, warnings, digital_submission')
        .is('digital_submitted_at', null);
        
      if (!error && data) {
        takenTokens = data
          .filter(r => r.token_id !== null && r.warnings !== -1 && r.digital_submission !== 'LEFT')
          .map(r => r.token_id);
      }
    } catch (err) {
      console.error("Failed to fetch tokens:", err);
    }
  }

  // Render final buttons or update them
  if (isRefresh) {
    const buttons = grid.querySelectorAll(".token-btn");
    buttons.forEach((btn, idx) => {
      const i = idx + 1;
      const isTaken = takenTokens.includes(i);
      btn.disabled = isTaken;
    });
  } else {
    grid.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement("button");
      btn.className = "token-btn";
      btn.textContent = i;
      btn.setAttribute("data-token", i);
      
      if (takenTokens.includes(i)) {
        btn.disabled = true;
      } else {
        btn.addEventListener("click", async () => {
          // Disable all buttons to prevent double click
          document.querySelectorAll(".token-btn").forEach(b => b.disabled = true);
          btn.classList.add("loading");

          // DOUBLE CHECK: Is it still available? (Prevent race condition)
          if (window.supabaseClient) {
            const { data: freshData } = await window.supabaseClient
              .from('team_assignments')
              .select('token_id, warnings, digital_submission')
              .is('digital_submitted_at', null);
              
            const activeTokens = freshData
              ?.filter(r => r.token_id !== null && r.warnings !== -1 && r.digital_submission !== 'LEFT')
              .map(r => r.token_id) || [];
              
            const isTaken = activeTokens.includes(i);
            
            if (isTaken) {
              alert("⚠️ This token was just taken by another team! Please choose another.");
              initTokenSelection(); // Refresh the grid
              return;
            }
          }
          
          initDashboard(globalUserName, globalUserCode, i);
          showScreen("screen-dashboard");
        });
      }
      grid.appendChild(btn);
    }
  }

  // Auto-refresh token grid every 5 seconds while on this screen
  if (!window.tokenRefreshInterval) {
    window.tokenRefreshInterval = setInterval(() => {
      const activeScreen = document.querySelector(".screen.active")?.id;
      if (activeScreen === "screen-tokens") {
        initTokenSelection();
      } else {
        clearInterval(window.tokenRefreshInterval);
        window.tokenRefreshInterval = null;
      }
    }, 5000);
  }
}

function initDashboard(userName, userCode, tokenId) {
  // ── Set user chip
  document.getElementById("chip-name").textContent = `${userName} · ${userCode} · #${tokenId}`;

  // ── Assign questions based on Token ID
  // Map token 1-10 to array indices (token 1 -> index 0, ..., token 10 -> index 9)
  // If array is shorter than 10, wrap around using modulo
  const digital = window.DIGITAL_QUESTIONS[(tokenId - 1) % window.DIGITAL_QUESTIONS.length];
  const analog  = window.ANALOG_QUESTIONS[(tokenId - 1) % window.ANALOG_QUESTIONS.length];

  // ── Render analog question
  const qAnalogText = document.getElementById("q-analog-text");
  const qAnalogImages = document.getElementById("q-analog-images");
  qAnalogText.textContent = analog.text;
  qAnalogImages.innerHTML = "";
  if (analog.images && analog.images.length > 0) {
    analog.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Question Image";
      qAnalogImages.appendChild(img);
    });
  }
  document.getElementById("q-analog-id").textContent = `ID: ${analog.id}`;

  // ── Render digital question
  const qDigitalText = document.getElementById("q-digital-text");
  const qDigitalImages = document.getElementById("q-digital-images");
  qDigitalText.textContent = digital.text;
  qDigitalImages.innerHTML = "";
  if (digital.images && digital.images.length > 0) {
    digital.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Question Image";
      qDigitalImages.appendChild(img);
    });
  }
  document.getElementById("q-digital-id").textContent = `ID: ${digital.id}`;

  // ── Save/Update assignment in Supabase
  if (window.supabaseClient) {
    // Manual Upsert Flow to avoid unique constraint issues
    window.supabaseClient
      .from('team_assignments')
      .select('*')
      .ilike('name', userName)
      .maybeSingle()
      .then(({ data: existing, error: fetchError }) => {
        if (fetchError) throw fetchError;

        // Preserve warnings (don't reset to 0 if they already have some)
        const preservedWarnings = (existing && typeof existing.warnings === 'number') ? existing.warnings : 0;
        tabWarnings = (preservedWarnings === -1) ? 0 : preservedWarnings; 

        const teamData = {
          name: userName,
          code: userCode,
          digital_id: digital.id,
          analog_id: analog.id,
          token_id: tokenId,
          warnings: tabWarnings,
          digital_submission: null // Reset 'LEFT' status if resuming
        };

        if (existing) {
          // UPDATE existing record
          return window.supabaseClient
            .from('team_assignments')
            .update(teamData)
            .eq('id', existing.id);
        } else {
          // INSERT new record
          return window.supabaseClient
            .from('team_assignments')
            .insert([teamData]);
        }
      })
      .then(({ error }) => {
        if (error) {
          console.error("❌ Supabase Sync Error:", error);
          alert("Database Error: " + error.message);
        } else {
          console.log("✅ Session synced for:", userName);
        }
      })
      .catch(err => {
        console.error("❌ Supabase Exception:", err);
        alert("Connection Exception: " + err.message);
      });
  }

  // ── Start countdown timer
  startTimer(TIMER_DURATION_SECONDS);

  // ── Warn on refresh / close
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "Your contest session is active. Are you sure you want to leave?";
  });



  // ── Navigation Logic
  const btnNext = document.getElementById("btn-next-analog");
  const btnBack = document.getElementById("btn-back-digital");
  const cardDigital = document.getElementById("card-digital");
  const cardAnalog = document.getElementById("card-analog");

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      cardDigital.classList.add("hidden");
      cardAnalog.classList.remove("hidden");
      cardAnalog.style.display = "block";
    });
  }

  if (btnBack) {
    btnBack.addEventListener("click", () => {
      cardAnalog.classList.add("hidden");
      cardDigital.classList.remove("hidden");
      cardDigital.style.display = "block";
    });
  }
}

// ── Lead Submission Logic
function initLeadSubmission(data) {
  document.getElementById("lead-team-info").textContent = `${data.name} · Token #${data.token_id}`;
  
  const btnDigital = document.getElementById("btn-capture-digital");
  const btnAnalog = document.getElementById("btn-capture-analog");
  const btnFinish = document.getElementById("btn-lead-finish");

  btnDigital.onclick = () => { activeCaptureType = "digital"; startCamera(); };
  btnAnalog.onclick = () => { activeCaptureType = "analog"; startCamera(); };

    btnFinish.disabled = true; // Disabled until at least one is captured
    btnFinish.onclick = async () => {
    if (confirm("Submit both answers and finish the contest?")) {
      btnFinish.disabled = true;
      btnFinish.textContent = "Finalizing...";
      await performLeadFinalSubmission();
    }
  };
}

async function startCamera() {
  try {
    const constraints = { video: { facingMode: "environment" } };
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    cameraVideo.srcObject = currentStream;
    cameraModal.classList.remove("hidden");
  } catch (err) {
    alert("Camera access failed: " + err.message);
  }
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(t => t.stop());
    currentStream = null;
  }
  cameraModal.classList.add("hidden");
}

  btnCloseCamera?.addEventListener("click", stopCamera);

  btnCapture?.addEventListener("click", () => {
    const context = cameraCanvas.getContext("2d");
    const MAX_DIM = 1024;
    let w = cameraVideo.videoWidth;
    let h = cameraVideo.videoHeight;
    if (w > h) { if (w > MAX_DIM) { h *= MAX_DIM / w; w = MAX_DIM; } }
    else { if (h > MAX_DIM) { w *= MAX_DIM / h; h = MAX_DIM; } }
    cameraCanvas.width = w; cameraCanvas.height = h;
    context.drawImage(cameraVideo, 0, 0, w, h);
    const data = cameraCanvas.toDataURL("image/jpeg", 0.6);
    
    if (activeCaptureType === "digital") {
      leadDigitalImage = data;
      document.getElementById("text-digital-status").textContent = "✅ Captured (Change)";
    } else {
      leadAnalogImage = data;
      document.getElementById("text-analog-status").textContent = "✅ Captured (Change)";
    }
    
    checkLeadSubmitReady();
    stopCamera();
  });

  function checkLeadSubmitReady() {
    const btn = document.getElementById("btn-lead-finish");
    btn.disabled = !(leadDigitalImage || leadAnalogImage);
  }

  async function performLeadFinalSubmission() {
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient
        .from('team_assignments')
        .update({
          digital_submission: leadDigitalImage,
          analog_submission: leadAnalogImage,
          digital_submitted_at: new Date().toISOString(),
          analog_submitted_at: new Date().toISOString()
        })
        .match({ name: globalUserName, code: globalUserCode });

      if (!error) {
        alert("Contest finished successfully!");
        showScreen("screen-login");
      } else {
        alert("Submission failed. Try again.");
        document.getElementById("btn-lead-finish").disabled = false;
      }
    }
  }

  document.getElementById("btn-lead-logout")?.addEventListener("click", () => {
    showScreen("screen-login");
  });

  // ── Tab Change Detection (Anti-Cheat)
  const warningOverlay = document.getElementById("warning-overlay");
  const warningCountEl = document.getElementById("warning-count");
  const btnResume = document.getElementById("btn-resume-contest");

  document.addEventListener("visibilitychange", async () => {
    // Only warn if on the dashboard and not a lead
    const activeScreen = document.querySelector(".screen.active")?.id;
    if (activeScreen === "screen-dashboard" && !isLeadMode && document.visibilityState === "hidden" && tabWarnings < MAX_WARNINGS) {
      tabWarnings++;
      warningCountEl.textContent = tabWarnings;
      
      // Inform Admin Panel
      if (window.supabaseClient && globalUserName && globalUserCode) {
        window.supabaseClient
          .from('team_assignments')
          .update({ warnings: tabWarnings })
          .match({ name: globalUserName, code: globalUserCode });
      }

      if (tabWarnings >= MAX_WARNINGS) {
        alert("🚫 DISQUALIFIED: You have switched tabs too many times.");
        showScreen("screen-login"); // Return to login immediately
        
        // Final sync in background
        if (window.supabaseClient && globalUserName && globalUserCode) {
          window.supabaseClient
            .from('team_assignments')
            .update({ 
              digital_submission: 'DISQUALIFIED',
              digital_submitted_at: new Date().toISOString() 
            })
            .match({ name: globalUserName, code: globalUserCode })
            .then(() => {
               if (timerInterval) clearInterval(timerInterval);
               // Optional: fully reset app state
               window.location.reload(); 
            });
        } else {
          window.location.reload();
        }
      } else {
        warningOverlay.classList.remove("hidden");
      }
    }
  });

  btnResume?.addEventListener("click", () => {
    warningOverlay.classList.add("hidden");
  });

  // ── Leave Contest Logic
  const btnLeave = document.getElementById("btn-leave-contest");
  btnLeave?.addEventListener("click", async () => {
    if (confirm("Are you sure you want to leave the contest? Your token will be released.")) {
      if (window.supabaseClient && globalUserName && globalUserCode) {
        // Store leaving time and mark as inactive
        await window.supabaseClient
          .from('team_assignments')
          .update({ 
            digital_submission: 'LEFT',
            digital_submitted_at: new Date().toISOString() 
          })
          .match({ name: globalUserName, code: globalUserCode });
      }
      
      if (timerInterval) clearInterval(timerInterval);
      showScreen("screen-login");
      hasSubmittedAtLeastOne = false;
      tabWarnings = 0;
    }
  });

  // Handle tab close / refresh
  window.addEventListener("beforeunload", () => {
    unlockToken();
  });

async function performFinalSubmission() {
  const statusEl = document.getElementById("status-final");

  try {
    if (typeof window.supabaseClient !== 'undefined' && window.supabaseClient !== null) {
      const updateData = {
        digital_submission: "COMPLETED",
        analog_submission: "COMPLETED",
        digital_submitted_at: new Date().toISOString(),
        analog_submitted_at: new Date().toISOString()
      };

      const { error } = await window.supabaseClient
        .from('team_assignments')
        .update(updateData)
        .match({ name: globalUserName, code: globalUserCode });

      if (error) throw error;

      hasSubmittedAtLeastOne = true;
      if (statusEl) {
        statusEl.textContent = "✅ Contest Completed Successfully";
        statusEl.classList.remove("hidden");
      }
      
      // Small delay then leave
      setTimeout(() => {
        if (timerInterval) clearInterval(timerInterval);
        showScreen("screen-login");
        // Reset dashboard state
        document.getElementById("card-analog").classList.add("hidden");
        document.getElementById("card-analog").style.display = "none";
        document.getElementById("card-digital").classList.remove("hidden");
        document.getElementById("card-digital").style.display = "block";
      }, 2000);
    }
  } catch (err) {
    console.error("Final submission failed:", err);
  }
}

function startTimer(totalSeconds) {
  const timerEl = document.getElementById("timer-display");
  const boxEl = document.getElementById("timer-box");
  let remaining = totalSeconds;

  // Clear any previous timer
  if (timerInterval) clearInterval(timerInterval);

  function tick() {
    timerEl.textContent = formatTime(remaining);

    const fraction = remaining / totalSeconds;

    // Update timer visual state
    boxEl.classList.remove("warn", "danger");
    if (fraction <= 0.1) {
      boxEl.classList.add("danger");
    } else if (fraction <= 0.33) {
      boxEl.classList.add("warn");
    }

    if (remaining <= 0) {
      clearInterval(timerInterval);
      showTimesUp();
      return;
    }

    remaining--;
  }

  tick(); // run immediately
  timerInterval = setInterval(tick, 1000);
}

function showTimesUp() {
  const overlay = document.getElementById("timesup-overlay");
  overlay.classList.remove("hidden");
  
  // Auto-submit logic
  if (typeof performFinalSubmission === 'function') {
    performFinalSubmission(); // Call without image data to mark as auto-submitted
  }

  // Disable all inputs on the dashboard
  document.querySelectorAll(".q-card").forEach((card) => {
    card.style.pointerEvents = "none";
    card.style.opacity       = "0.5";
  });

  // Automatically return to login screen after 5 seconds
  setTimeout(() => {
    // Hide overlay
    overlay.classList.add("hidden");
    
    // Reset dashboard visuals for next session
    document.querySelectorAll(".q-card").forEach((card) => {
      card.style.pointerEvents = "auto";
      card.style.opacity       = "1";
    });
    
    // Hide analog card, show digital card for next session
    document.getElementById("card-analog").classList.add("hidden");
    document.getElementById("card-analog").style.display = "none";
    document.getElementById("card-digital").classList.remove("hidden");
    document.getElementById("card-digital").style.display = "block";

    // Clear inputs and show login screen
    document.getElementById("inp-name").value = "";
    document.getElementById("inp-code").value = "";
    document.getElementById("btn-login").disabled = false;
    document.getElementById("btn-login").classList.remove("loading");
    document.getElementById("btn-login").querySelector(".btn-icon").textContent = "⚡";
    document.getElementById("btn-login").querySelector(".btn-text").textContent = "Login";

    showScreen("screen-login");
  }, 5000);
}

/* ════════════════════════════════════════════════════════════
   FULLSCREEN HELPER
   ════════════════════════════════════════════════════════════ */

function tryRequestFullscreen() {
  const el = document.documentElement;
  const req = el.requestFullscreen
    || el.webkitRequestFullscreen
    || el.mozRequestFullScreen
    || el.msRequestFullscreen;

  if (req) {
    req.call(el).catch(() => {
      // Fullscreen may be denied — silently ignore
    });
  }
}
/* ════════════════════════════════════════════════════════════
   ADMIN SHORTCUT
   ════════════════════════════════════════════════════════════ */

window.addEventListener("keydown", (e) => {
  // Use Ctrl + Shift + A to access the admin panel
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    window.location.href = "admin.html";
  }
});
