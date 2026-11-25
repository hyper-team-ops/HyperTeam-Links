const grid = document.querySelector("#channel-grid");
const links = window.HYPERTEAM_LINKS || [];
const dialog = document.querySelector("#qr-dialog");
const qrTitle = dialog.querySelector("#qr-title");
const qrImage = dialog.querySelector(".qr-large");
const qrAction = dialog.querySelector(".card-action");
const iconPaths = {
  telegram: '<path d="m21.5 3.8-3.2 16c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L5.8 17.3l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.2 6c1-.4 1.8.2 1.3 1.8Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/>',
  facebook: '<path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z"/>',
  youtube: '<path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12Z"/><path d="m10 15 5-3-5-3v6Z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.1 0l2-2A5 5 0 0 0 12 4l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.link}</svg>`;
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

const htmlEntities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => htmlEntities[character]);
}

const channels = links
  .map(item => ({ ...item, href: safeUrl(item.url) }))
  .filter(item => item.href);

grid.innerHTML = channels.map((item, index) => {
  const name = escapeHtml(item.name);
  const actionText = escapeHtml(item.action || "انضموا إلينا");
  const loading = index < 3 ? "eager" : "lazy";
  const qr = item.qr ? `
    <a class="qr-link" href="${escapeHtml(item.qr)}" target="_blank" rel="noopener noreferrer" aria-label="تكبير رمز ${name}">
      <span class="qr-frame"><img src="${escapeHtml(item.qr)}" alt="" width="144" height="144" loading="${loading}" /></span>
      <span class="qr-caption" aria-hidden="true">تكبير الرمز <span>⤢</span></span>
    </a>` : "";

  return `<article class="channel-card${index === 0 ? " featured" : ""}${qr ? "" : " without-qr"}">
      <div class="card-details">
        <span class="channel-icon">${icon(item.icon)}</span>
        <div class="card-text">
          <h3>${name}</h3>
          ${item.handle ? `<p class="channel-handle" dir="ltr" lang="en">${escapeHtml(item.handle)}</p>` : ""}
          <p class="channel-description">${escapeHtml(item.description || "تابعونا على قناتنا الرسمية.")}</p>
        </div>
      </div>
      ${qr}
      <a class="card-action" href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer"><span>${actionText}</span><span aria-hidden="true">↗</span></a>
    </article>`;
}).join("");

document.querySelector("#links-note").hidden = channels.length > 0;

grid.addEventListener("click", event => {
  const trigger = event.target.closest(".qr-link");
  if (!trigger || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;

  event.preventDefault();
  const card = trigger.closest(".channel-card");
  const action = card.querySelector(".card-action");
  const name = card.querySelector("h3").textContent;
  qrTitle.textContent = name;
  qrImage.src = trigger.href;
  qrImage.alt = `رمز QR لـ ${name}`;
  qrAction.href = action.href;
  qrAction.firstElementChild.textContent = action.firstElementChild.textContent;
  dialog.showModal();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#year").textContent = new Date().getFullYear();
