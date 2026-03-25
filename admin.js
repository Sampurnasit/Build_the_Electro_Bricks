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
    modalText.textContent  = q.text;
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
      .select("*")
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

      row.innerHTML = `
        <td>${team.name}</td>
        <td>${team.code}</td>
        <td><span class="q-id" data-id="${team.digital_id}" title="Click to view question">${team.digital_id}</span></td>
        <td><span class="q-id" data-id="${team.analog_id}"  title="Click to view question">${team.analog_id}</span></td>
        <td>${date} ${time}</td>
      `;
      tableBody.appendChild(row);
    });

    // Attach click listeners to all newly rendered id badges
    tableBody.querySelectorAll(".q-id").forEach(el => {
      el.addEventListener("click", () => openModal(el.dataset.id));
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
