// V6 base + V7 per-category Select All / Clear buttons (no removals)
// Edit the categories below to match your exact V6 list if needed.

const categories = [
  {
    name: "Search Engines",
    items: [
      { label: "Google", url: "https://www.google.com/search?q=" },
      { label: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
      { label: "Bing", url: "https://www.bing.com/search?q=" },
      { label: "Startpage", url: "https://www.startpage.com/do/dsearch?query=" },
      { label: "Brave Search", url: "https://search.brave.com/search?q=" }
    ]
  },
  {
    name: "Social Media",
    items: [
      { label: "Facebook", url: "https://www.facebook.com/search/top?q=" },
      { label: "Instagram", url: "https://www.instagram.com/explore/search/keyword/?q=" },
      { label: "X / Twitter", url: "https://twitter.com/search?q=" },
      { label: "LinkedIn", url: "https://www.linkedin.com/search/results/all/?keywords=" },
      { label: "Reddit", url: "https://www.reddit.com/search/?q=" },
      { label: "TikTok", url: "https://www.tiktok.com/search?q=" }
    ]
  },
  {
    name: "Buy & Sell",
    items: [
      { label: "FB Marketplace", url: "https://www.facebook.com/marketplace/search/?query=" },
      { label: "Kijiji", url: "https://www.kijiji.ca/b-search.html?query=" },
      { label: "Craigslist", url: "https://www.craigslist.org/search/sss?query=" },
      { label: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=" },
      { label: "OfferUp", url: "https://offerup.com/search?q=" },
      { label: "Gumtree", url: "https://www.gumtree.com/search?search_category=all&q=" }
    ]
  },
  {
    name: "People / Public Records",
    items: [
      { label: "That'sThem", url: "https://thatsthem.com/name/" }, // expects name in path; we still append encoded query
      { label: "FastPeopleSearch", url: "https://www.fastpeoplesearch.com/name/" },
      { label: "Spokeo", url: "https://www.spokeo.com/" }
    ]
  },
  {
    name: "Images / Media",
    items: [
      { label: "Google Images", url: "https://www.google.com/search?tbm=isch&q=" },
      { label: "Yandex Images", url: "https://yandex.com/images/search?text=" },
      { label: "TinEye", url: "https://tineye.com/search?url=" } // works best with image URL; kept for convenience
    ]
  },
  {
    name: "Documents",
    items: [
      { label: "Google PDFs", url: "https://www.google.com/search?q=filetype:pdf+" },
      { label: "Google Docs", url: "https://www.google.com/search?q=filetype:doc+OR+filetype:docx+" },
      { label: "Google XLS", url: "https://www.google.com/search?q=filetype:xls+OR+filetype:xlsx+" }
    ]
  },
  {
    name: "Maps / Places",
    items: [
      { label: "Google Maps", url: "https://www.google.com/maps/search/" },
      { label: "OpenStreetMap", url: "https://www.openstreetmap.org/search?query=" }
    ]
  },
  {
    name: "Archives",
    items: [
      { label: "Wayback Machine (Search)", url: "https://web.archive.org/web/*/" },
      { label: "Archive.today (Search)", url: "https://archive.today/" }
    ]
  }
];

const sourcesDiv = document.getElementById("sources");

categories.forEach((cat, idx) => {
  const card = document.createElement("div");
  card.className = "border rounded p-3 dark-card";

  const header = document.createElement("div");
  header.className = "flex justify-between items-center mb-2";

  const title = document.createElement("strong");
  title.textContent = cat.name;

  const btnWrap = document.createElement("div");
  btnWrap.className = "flex gap-2";

  const selBtn = document.createElement("button");
  selBtn.textContent = "Select All";
  selBtn.className = "cat-btn bg-gray-600 text-white";
  selBtn.onclick = () => card.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = true);

  const clrBtn = document.createElement("button");
  clrBtn.textContent = "Clear";
  clrBtn.className = "cat-btn bg-gray-600 text-white";
  clrBtn.onclick = () => card.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);

  btnWrap.appendChild(selBtn);
  btnWrap.appendChild(clrBtn);

  header.appendChild(title);
  header.appendChild(btnWrap);
  card.appendChild(header);

  cat.items.forEach(item => {
    const label = document.createElement("label");
    label.className = "block text-sm";
    label.innerHTML = `<input type="checkbox" data-url="${item.url}"> ${item.label}`;
    card.appendChild(label);
  });

  sourcesDiv.appendChild(card);
});

function getNames() {
  return document.getElementById("names").value
    .split(/[\n,]/)
    .map(n => n.trim())
    .filter(Boolean);
}

function runSearch() {
  const names = getNames();
  const city = document.getElementById("city").value;
  const province = document.getElementById("province").value;
  const country = document.getElementById("country").value;
  const exclude = document.getElementById("excludeObits").checked;

  const loc = [city, province, country].filter(Boolean).join(" ");
  const suffix = exclude ? " -obituary -death" : "";

  const selected = document.querySelectorAll("#sources input[type=checkbox]:checked");
  selected.forEach(cb => {
    const base = cb.dataset.url || "";
    names.forEach(name => {
      const q = encodeURIComponent(`${name} ${loc}${suffix}`.trim());
      // If the base ends with /name/ style path, just append query safely:
            window.open(base + q, "_blank");
    });
  });
}

function selectAll() {
  document.querySelectorAll("#sources input[type=checkbox]").forEach(cb => cb.checked = true);
}

function clearAll() {
  document.querySelectorAll("#sources input[type=checkbox]").forEach(cb => cb.checked = false);
}

document.getElementById("modeBtn").onclick = () => {
  document.body.classList.toggle("bg-gray-900");
  document.body.classList.toggle("text-white");
  document.querySelectorAll("input, textarea").forEach(el => el.classList.toggle("dark-input"));
};

window.runPhoneLookup = function () {
  console.log("runPhoneLookup fired");

  const input = document.getElementById("phoneInput");
  if (!input) {
    alert("phoneInput not found");
    return;
  }

  const phone = input.value.trim();
  if (!phone) {
    alert("Enter a phone number");
    return;
  }

  const checked = document.querySelectorAll(".phone-src:checked");
  if (checked.length === 0) {
    alert("Select at least one lookup source");
    return;
  }

  const encoded = encodeURIComponent(phone);
  checked.forEach(cb => {
    window.open(cb.dataset.url + encoded, "_blank");
  });
};
