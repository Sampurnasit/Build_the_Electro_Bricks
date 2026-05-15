"use strict";

/* ════════════════════════════════════════════════════════════
   ADMIN PASSWORD — change this to your own secret
   ════════════════════════════════════════════════════════════ */
const ADMIN_PASSWORD = "ADMIN2026";

// ── Gate logic: runs before anything else
(function enforceAdminGate() {
  // If already authenticated this session, skip gate
  if (sessionStorage.getItem("beb_admin_auth") === "true") {
    document.getElementById("admin-gate").style.display = "none";
    document.getElementById("admin-dashboard-wrap").style.display = "block";
    return;
  }

  const gate    = document.getElementById("admin-gate");
  const wrap    = document.getElementById("admin-dashboard-wrap");
  const input   = document.getElementById("admin-pass-input");
  const btn     = document.getElementById("admin-gate-btn");
  const errEl   = document.getElementById("admin-gate-error");

  function tryUnlock() {
    const entered = input.value.trim();
    if (entered === ADMIN_PASSWORD) {
      sessionStorage.setItem("beb_admin_auth", "true");
      gate.style.display = "none";
      wrap.style.display = "block";
    } else {
      errEl.classList.remove("hidden");
      input.value = "";
      input.focus();
      // Shake animation
      errEl.style.animation = "none";
      void errEl.offsetWidth;
      errEl.style.animation = "";
    }
  }

  btn.addEventListener("click", tryUnlock);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") tryUnlock(); });
})();

document.addEventListener("DOMContentLoaded", () => {
  const tableBody    = document.getElementById("admin-table-body");
  const btnClear     = document.getElementById("btn-clear");
  const modalOverlay = document.getElementById("q-modal-overlay");
  const modalBadge   = document.getElementById("q-modal-badge");
  const modalText    = document.getElementById("q-modal-text");
  const modalClose   = document.getElementById("q-modal-close");

  // ── Build a lookup map from all questions { "D1": {...}, "A3": {...}, ... }
  const questionMap = {};
  (window.DIGITAL_QUESTIONS || []).forEach(q => { questionMap[q.id] = { ...q, type: "digital" }; });
  (window.ANALOG_QUESTIONS  || []).forEach(q => { questionMap[q.id] = { ...q, type: "analog"  }; });

  // ── Modal helpers
  function openModal(qId) {
    const q = questionMap[qId];
    if (!q) return;
    const isDigital = q.type === "digital";
    modalBadge.textContent = `${isDigital ? "🔢 Digital" : "⚡ Analog"} · ${q.id}`;
    modalBadge.className   = `q-modal-badge ${q.type}`;
    modalText.innerHTML  = q.text; // Use innerHTML to allow images
    modalOverlay.classList.add("visible");
  }

  function openImageModal(type, base64Data, teamName) {
    modalBadge.textContent = `${type === "digital" ? "🔢 Digital" : "⚡ Analog"} Submission · ${teamName}`;
    modalBadge.className   = `q-modal-badge ${type}`;
    modalText.innerHTML = `
      <div style="text-align: center;">
        <img src="${base64Data}" style="max-width: 100%; max-height: 70vh; border-radius: 8px; border: 1px solid var(--border2); margin-top: 10px;" alt="Submission" />
        <p style="margin-top: 15px; font-family: 'Space Mono', monospace; font-size: 0.8rem; color: var(--text2);">
          Right-click image to save or open in new tab.
        </p>
      </div>
    `;
    modalOverlay.classList.add("visible");
  }

  function closeModal() {
    modalOverlay.classList.remove("visible");
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ── Table rendering
  async function renderTable() {
    const { data, error } = await window.supabaseClient
      .from("team_assignments")
      .select("id, name, code, digital_id, analog_id, created_at, digital_submission, analog_submission, digital_submitted_at, analog_submitted_at, warnings, token_id")
      .order("created_at", { ascending: false });

    tableBody.innerHTML = "";

    if (error) {
      tableBody.innerHTML = `<tr><td colspan="5" class="empty-msg" style="color:var(--red);">Error connecting to database: ${error.message}</td></tr>`;
      return;
    }

    if (!data || data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="empty-msg">No teams have logged in yet.</td></tr>`;
      return;
    }

    data.forEach(team => {
      const row  = document.createElement("tr");
      const time = new Date(team.created_at).toLocaleTimeString();
      const date = new Date(team.created_at).toLocaleDateString();

      // We check if submission exists by checking if the field is not null
      const digitalSub = team.digital_submission ? `<span class="q-id digital-sub" data-id="${team.id}" data-type="digital" title="View Digital Submission">📸 D</span>` : '';
      const analogSub  = team.analog_submission  ? `<span class="q-id analog-sub"  data-id="${team.id}" data-type="analog"  title="View Analog Submission">📸 A</span>` : '';
      
      const subIcons = (digitalSub || analogSub) ? `${digitalSub} ${analogSub}` : '<span style="opacity:0.3; font-size:0.7rem;">None</span>';

      const digitalTime = team.digital_submitted_at ? new Date(team.digital_submitted_at).toLocaleTimeString() : null;
      const analogTime  = team.analog_submitted_at  ? new Date(team.analog_submitted_at).toLocaleTimeString()  : null;
      const submissionTime = digitalTime || analogTime || '<span style="opacity:0.3">-</span>';

      const warnings = team.warnings || 0;
      const warningBadge = warnings > 0 ? `<span style="color:var(--red); font-weight:bold;">⚠ ${warnings}</span>` : '<span style="opacity:0.3">0</span>';

      const isLeft = team.digital_submission === 'LEFT';
      const teamDisplayName = isLeft ? `${team.name} <span style="font-size:0.6rem; color:var(--text2); background:rgba(255,255,255,0.05); padding:2px 4px; border-radius:3px; margin-left:5px;">LEFT</span>` : team.name;

      row.innerHTML = `
        <td>${teamDisplayName}</td>
        <td><span class="q-badge" style="background:var(--cyan2); color:#fff; padding:2px 8px; border-radius:4px; font-size:0.7rem;">#${team.token_id || '-'}</span></td>
        <td><span class="q-id" data-id="${team.digital_id}" title="Click to view question">${team.digital_id}</span></td>
        <td><span class="q-id" data-id="${team.analog_id}"  title="Click to view question">${team.analog_id}</span></td>
        <td>${subIcons}</td>
        <td>${warningBadge}</td>
        <td>${submissionTime}</td>
        <td>${date} ${time}</td>
      `;
      tableBody.appendChild(row);
    });

    // Attach click listeners to all newly rendered id badges
    tableBody.querySelectorAll(".q-id").forEach(el => {
      if (el.classList.contains("digital-sub") || el.classList.contains("analog-sub")) {
        el.addEventListener("click", async () => {
          const id = el.dataset.id;
          const type = el.dataset.type;
          const teamName = el.closest('tr').cells[0].textContent;
          
          // Show loading in modal
          modalBadge.textContent = "Loading Submission...";
          modalText.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--cyan);">Fetching image data...</div>`;
          modalOverlay.classList.add("visible");

          // Fetch full submission data only when needed
          const { data: subData, error: subError } = await window.supabaseClient
            .from("team_assignments")
            .select(`${type}_submission`)
            .eq("id", id)
            .single();

          if (subError || !subData) {
            modalText.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--red);">Error loading image: ${subError ? subError.message : "Not found"}</div>`;
          } else {
            openImageModal(type, subData[`${type}_submission`], teamName);
          }
        });
      } else {
        el.addEventListener("click", () => openModal(el.dataset.id));
      }
    });
  }

  // ── Clear button
  btnClear.addEventListener("click", async () => {
    if (confirm("Are you sure you want to clear all team assignment data? This cannot be undone.")) {
      const { error } = await window.supabaseClient
        .from('team_assignments')
        .delete()
        .neq('id', 0);

      if (error) {
        alert("Failed to clear data: " + error.message);
      } else {
        renderTable();
      }
    }
  });

  // Initial render + auto-refresh every 5 seconds
  renderTable();
  setInterval(renderTable, 5000);
});
