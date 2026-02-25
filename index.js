import {
  bio,
  skills,
  education,
  experience,
  publication,
  footer,
  portfolio,
} from "./user-data/data.js";

import { URLs } from "./user-data/urls.js";

const { medium, gitConnected } = URLs;

// ── API fetchers ────────────────────────────────────────────

async function fetchBlogsFromMedium(url) {
  try {
    const response = await fetch(url);
    const { items } = await response.json();
    populateBlogs(items, "blogs-list");
  } catch (error) {
    console.error(`Error fetching blogs from Medium: ${error}`);
  }
}

async function fetchGitConnectedData(url) {
  try {
    const response = await fetch(url);
    const { basics } = await response.json();
    mapBasicResponse(basics);
  } catch (error) {
    console.error(`Error fetching gitconnected data: ${error}`);
  }
}

async function fetchQiitaData(username) {
  const url = `https://qiita.com/${username}`;
  try {
    const response = await fetch(url);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const contributions = doc.querySelector('a[href$="/contributions"] span')?.textContent || "N/A";
    const posts         = doc.querySelector('a[href$="/OSAKO"] span')?.textContent || "N/A";
    const followers     = doc.querySelector('a[href$="/followers"]')?.textContent.trim() || "N/A";
    const following     = doc.querySelector('a[href$="/following_users"]')?.textContent.trim() || "N/A";
    populateQiitaCard({ contributions, posts, followers, following });
  } catch (error) {
    console.error("Error fetching Qiita data:", error);
  }
}

// ── Data mappers ────────────────────────────────────────────

function mapBasicResponse(basics) {
  const { name } = basics;
  window.parent.document.title = name;
}

// ── Populate functions ──────────────────────────────────────

function populateBio(items, id) {
  const container = document.getElementById(id);
  if (!container) return;
  items.forEach((item) => {
    const p = document.createElement("p");
    p.innerHTML = item;
    container.appendChild(p);
  });
}

function populateSkills(items, id) {
  const container = document.getElementById(id);
  if (!container) return;
  items.forEach((item) => {
    const badge = document.createElement("span");
    badge.className = "scroll-animate";
    badge.style.cssText = `
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      background: rgba(0,212,180,0.08);
      border: 1px solid rgba(0,212,180,0.25);
      color: #00d4b4;
      line-height: 1.4;
    `;
    badge.innerHTML = item;
    container.appendChild(badge);
  });
}

function populatePublication(items) {
  const container = document.getElementById("publication-list");
  if (!container) return;
  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "glass-card scroll-animate";
    li.style.cssText = "padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;";
    li.innerHTML = `
      <div style="
        flex-shrink: 0;
        width: 2rem; height: 2rem;
        border-radius: 50%;
        background: rgba(0,212,180,0.1);
        display: flex; align-items: center; justify-content: center;
        margin-top: 2px;
      ">
        <i class="fa-solid fa-file-lines" style="font-size: 0.75rem; color: #00d4b4;"></i>
      </div>
      <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.7; margin: 0;">${item}</p>
    `;
    container.appendChild(li);
  });
}

function populateBlogs(items, id) {
  const container = document.getElementById(id);
  if (!container) return;
  const count = Math.min(3, items.length);

  for (let i = 0; i < count; i++) {
    const card = document.createElement("a");
    card.href   = items[i].link;
    card.target = "_blank";
    card.rel    = "noopener noreferrer";
    card.className = "glass-card scroll-animate";
    card.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem;
      text-decoration: none;
      transition: transform 0.3s ease, border-color 0.3s ease;
      cursor: pointer;
    `;

    const html = items[i].content || "";
    const [, excerpt] = /<p>(.*?)<\/p>/g.exec(html) || [];

    const categoriesHtml = (items[i].categories || [])
      .slice(0, 3)
      .map(c => `
        <span style="
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 9999px;
          background: rgba(0,212,180,0.12);
          color: #00d4b4;
        ">${c}</span>
      `).join("");

    card.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">${categoriesHtml}</div>
      <h3 style="
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        color: #f1f5f9;
        line-height: 1.4;
        margin: 0;
      ">${items[i].title}</h3>
      <p style="
        font-size: 0.8125rem;
        color: #94a3b8;
        line-height: 1.65;
        flex: 1;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      ">${excerpt || ""}</p>
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 0.75rem;
        border-top: 1px solid rgba(255,255,255,0.07);
        margin-top: auto;
      ">
        <span style="font-size: 0.75rem; color: #64748b;">${getBlogDate(items[i].pubDate)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem; color: #00d4b4;"></i>
      </div>
    `;

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

    container.appendChild(card);
  }
}

function populateExp_Edu(items, id) {
  const container = document.getElementById(id);
  if (!container) return;

  items.forEach((item) => {
    const el = document.createElement("div");
    el.className = "timeline-item scroll-animate";

    const tagsHtml = (item.tags || []).map(tag => `
      <span style="
        font-size: 0.75rem;
        padding: 4px 12px;
        border-radius: 9999px;
        font-weight: 500;
        background: rgba(0,212,180,0.08);
        color: #00d4b4;
        border: 1px solid rgba(0,212,180,0.2);
      ">${tag}</span>
    `).join("");

    const detailsHtml = (item.details || []).map(d => `
      <li style="
        font-size: 0.875rem;
        color: #94a3b8;
        display: flex;
        gap: 8px;
        align-items: flex-start;
        line-height: 1.6;
      ">
        <span style="color: #00d4b4; flex-shrink: 0; margin-top: 3px;">▸</span>
        <span>${d}</span>
      </li>
    `).join("");

    el.innerHTML = `
      <div class="glass-card" style="padding: 1.5rem;">
        <div style="
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: ${item.details.length > 0 || item.tags.length > 0 ? '1rem' : '0'};
        ">
          <div>
            <h3 style="
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 600;
              font-size: 1.0625rem;
              color: #f1f5f9;
              margin: 0 0 4px;
              line-height: 1.3;
            ">${item.title}</h3>
            <p style="font-size: 0.875rem; color: #00d4b4; font-weight: 500; margin: 0;">${item.subtitle}</p>
          </div>
          <span style="
            font-size: 0.75rem;
            padding: 5px 12px;
            border-radius: 9999px;
            white-space: nowrap;
            background: rgba(255,255,255,0.05);
            color: #94a3b8;
            border: 1px solid rgba(255,255,255,0.08);
            flex-shrink: 0;
          ">${item.duration}</span>
        </div>
        ${item.details.length > 0 ? `<ul style="list-style: none; padding: 0; margin: 0 0 ${item.tags.length > 0 ? '1rem' : '0'}; display: flex; flex-direction: column; gap: 6px;">${detailsHtml}</ul>` : ""}
        ${item.tags.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 8px;">${tagsHtml}</div>` : ""}
      </div>
    `;

    container.appendChild(el);
  });
}

function populateLinks(items, id) {
  const footerContent   = document.getElementById(id);
  const footerCopyright = document.getElementById("footer-copyright");

  items.forEach((item) => {
    if (item.label !== "copyright-text") {
      const col = document.createElement("div");

      const heading = document.createElement("h3");
      heading.style.cssText = `
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 0.9375rem;
        color: #e2e8f0;
        margin: 0 0 1rem;
      `;
      heading.innerHTML = item.label;
      col.appendChild(heading);

      const ul = document.createElement("ul");
      ul.style.cssText = "list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;";

      item.data.forEach((data) => {
        const li = document.createElement("li");
        li.style.cssText = "font-size: 0.875rem; color: #94a3b8; line-height: 1.6;";
        if (data.func) {
          li.innerHTML = `<span onclick="${data.func}" style="cursor: pointer; color: #94a3b8;">${data.text}</span>`;
        } else {
          li.innerHTML = data.text;
        }
        ul.appendChild(li);
      });

      col.appendChild(ul);
      if (footerContent) footerContent.appendChild(col);

    } else {
      item.data.forEach((copyright) => {
        const p = document.createElement("p");
        p.style.cssText = "margin: 0; font-size: 0.8125rem;";
        p.innerHTML = copyright;
        if (footerCopyright) footerCopyright.appendChild(p);
      });
    }
  });
}

function populateQiitaCard({ contributions, posts, followers, following }) {
  const footerContent = document.getElementById("footer-content");
  if (!footerContent) return;

  const col = document.createElement("div");
  col.className = "qiita-card";

  const heading = document.createElement("h3");
  heading.style.cssText = `
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.9375rem;
    color: #e2e8f0;
    margin: 0 0 1rem;
  `;
  heading.innerHTML = `<i class="fa-brands fa-quora" style="color: #00d4b4; margin-right: 6px;"></i>Qiita Stats`;
  col.appendChild(heading);

  const stats = [
    { label: "Contributions", value: contributions },
    { label: "Posts",         value: posts },
    { label: "Followers",     value: followers },
    { label: "Following",     value: following },
  ];

  const ul = document.createElement("ul");
  ul.style.cssText = "list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;";

  stats.forEach(({ label, value }) => {
    const li = document.createElement("li");
    li.style.cssText = "font-size: 0.875rem; color: #94a3b8; display: flex; justify-content: space-between;";
    li.innerHTML = `<span>${label}</span><span style="color: #00d4b4; font-weight: 600;">${value}</span>`;
    ul.appendChild(li);
  });

  col.appendChild(ul);
  footerContent.appendChild(col);
}

function populatePortfolio(items, id) {
  const container = document.getElementById(id);
  if (!container) return;

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "glass-card scroll-animate";
    card.style.cssText = "overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease;";

    const gisDataHtml = (item.gisData || []).map(d => `
      <span style="
        font-size: 0.75rem;
        padding: 3px 10px;
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
        color: #94a3b8;
        border: 1px solid rgba(255,255,255,0.08);
      ">${d}</span>
    `).join("");

    card.innerHTML = `
      <div style="position: relative; height: 200px; overflow: hidden;">
        <img src="${item.image}" alt="${item.serviceName}"
             style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(10,15,30,0.85));
        "></div>
      </div>
      <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        <h3 class="gradient-text" style="
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          margin: 0;
        ">${item.serviceName}</h3>
        <p style="font-size: 0.875rem; color: #94a3b8; line-height: 1.65; margin: 0;">${item.description}</p>
        <div>
          <p style="font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin: 0 0 8px;">Data Sources</p>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">${gisDataHtml}</div>
        </div>
      </div>
    `;

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

    container.appendChild(card);
  });
}

// ── Helpers ─────────────────────────────────────────────────

function getBlogDate(publishDate) {
  const elapsed = Date.now() - Date.parse(publishDate);
  const s  = 1000, m = s * 60, h = m * 60, d = h * 24, mo = d * 30, y = d * 365;

  if (elapsed < m)  return `${Math.floor(elapsed / s)} seconds ago`;
  if (elapsed < h)  return `${Math.floor(elapsed / m)} minutes ago`;
  if (elapsed < d)  return `${Math.floor(elapsed / h)} hours ago`;
  if (elapsed < mo) { const n = Math.floor(elapsed / d);  return `${n} day${n === 1 ? "" : "s"} ago`; }
  if (elapsed < y)  { const n = Math.floor(elapsed / mo); return `${n} month${n === 1 ? "" : "s"} ago`; }
  const n = Math.floor(elapsed / y);
  return `${n} year${n === 1 ? "" : "s"} ago`;
}

// ── Initialize ──────────────────────────────────────────────

populatePortfolio(portfolio, "portfolio");
populateBio(bio, "bio");
populateSkills(skills, "skills-list");
populateExp_Edu(experience, "experience-list");
populatePublication(publication);
populateExp_Edu(education, "education-list");
populateLinks(footer, "footer-content");

fetchBlogsFromMedium(medium);
fetchGitConnectedData(gitConnected);
fetchQiitaData("OSAKO");
