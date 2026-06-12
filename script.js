const data = [
  {
    module: "ABA",
    code: "0110",
    description: "جهد كهربي منخفض بسلك الكهرباء الخاص بالكنترول"
  },
  {
    module: "ABA",
    code: "0111",
    description: "جهد كهربى مرتفع بسلك الكهرباء الخاص بالكنترول"
  },
  {
    module: "ABA",
    code: "0150",
    description: "عطل داخلي بالكنترول"
  },

  {
    module: "ART",
    code: "0100",
    description: "عطل داخلي بكنترول ART"
  },

  {
    module: "BS",
    code: "0117",
    description: "اشارة السرعة لا تطابق النظام"
  },

  {
    module: "BTS",
    code: "0110",
    description: "عطل داخلي بكنترول BTS"
  },

  {
    module: "EDW",
    code: "F052",
    description: "لا توجد تغذية من باب السائق"
  }
];

function render(items) {
  const container = document.getElementById("container");

  container.innerHTML = "";

  let groups = {};

  items.forEach(item => {
    if (!groups[item.module]) groups[item.module] = [];
    groups[item.module].push(item);
  });

  Object.keys(groups).forEach(module => {

    const section = document.createElement("div");
    section.className = "section";

    section.innerHTML = `
      <div class="section-title">${module}</div>
      <div class="cards">

        ${groups[module].map(item => `
          <div class="card" data-code="${item.code}" data-desc="${item.description}">
            <div class="code">${item.code}</div>
            <div class="desc">${item.description}</div>
          </div>
        `).join("")}

      </div>
    `;

    container.appendChild(section);
  });
}

// البحث (يخلي كل شيء ظاهر + يحدد فقط)
document.addEventListener("input", (e) => {

  if (e.target.id !== "search") return;

  const value = e.target.value.toLowerCase();

  const cards = document.querySelectorAll(".card");

  cards.forEach(c => c.classList.remove("highlight"));

  if (!value) return;

  let first = null;

  cards.forEach(card => {

    const code = card.dataset.code.toLowerCase();
    const desc = card.dataset.desc.toLowerCase();

    if (code.includes(value) || desc.includes(value)) {

      card.classList.add("highlight");

      if (!first) first = card;
    }
  });

  if (first) {
    first.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

render(data);