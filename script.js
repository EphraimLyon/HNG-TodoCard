/* ── Todo Card — script.js ── */

const DUE_DATE = new Date("2026-04-16T18:00:00Z");

/* ── Elements ── */
const card       = document.querySelector('[data-testid="test-todo-card"]');
const checkbox   = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusEl   = document.querySelector('[data-testid="test-todo-status"]');
const timeEl     = document.querySelector('[data-testid="test-todo-time-remaining"]');

/* ── Time remaining ── */
function friendlyTimeRemaining() {
  const now   = Date.now();
  const diff  = DUE_DATE.getTime() - now;
  const abs   = Math.abs(diff);

  const mins  = Math.floor(abs / 60_000);
  const hrs   = Math.floor(abs / 3_600_000);
  const days  = Math.floor(abs / 86_400_000);

  if (Math.abs(diff) < 60_000) return { text: "Due now!", overdue: false };

  if (diff > 0) {
    // still in the future
    if (days >= 2)  return { text: `Due in ${days} days`,      overdue: false };
    if (days === 1) return { text: "Due tomorrow",              overdue: false };
    if (hrs  >= 1)  return { text: `Due in ${hrs}h`,           overdue: false };
    return { text: `Due in ${mins}m`, overdue: false };
  } else {
    // past due
    if (days >= 2)  return { text: `Overdue by ${days} days`,  overdue: true  };
    if (days === 1) return { text: "Overdue by 1 day",         overdue: true  };
    if (hrs  >= 1)  return { text: `Overdue by ${hrs}h`,       overdue: true  };
    return { text: `Overdue by ${mins}m`, overdue: true };
  }
}

function updateTimeRemaining() {
  const { text, overdue } = friendlyTimeRemaining();
  timeEl.textContent = text;
  timeEl.classList.toggle("overdue", overdue);
  timeEl.setAttribute("aria-label", text);
}

/* Run immediately, then every 60 s */
updateTimeRemaining();
setInterval(updateTimeRemaining, 60_000);

/* ── Checkbox toggle ── */
checkbox.addEventListener("change", () => {
  const done = checkbox.checked;

  card.classList.toggle("is-done", done);

  statusEl.textContent = done ? "Done" : "In Progress";
  statusEl.dataset.status = done ? "Done" : "In Progress";
  statusEl.setAttribute("aria-label", `Status: ${done ? "Done" : "In Progress"}`);
});

/* ── Edit / Delete buttons ── */
function handleEdit() {
  console.log("edit clicked");
}

function handleDelete() {
  alert("Delete clicked");
}
