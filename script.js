const files = [
    "data/aba.json",
    "data/art.json",
    "data/bs.json",
    "data/bts.json",
    "data/edw.json"
];

const container = document.getElementById("codes-container");
const search = document.getElementById("search");
const resultsCount = document.getElementById("results-count");

let allData = [];

async function loadData() {

    for (const file of files) {

        try {

            const response = await fetch(file);

            const data = await response.json();

            allData.push(...data);

        } catch (err) {

            console.log(file + " not found");

        }
    }

    render(allData);
}

function render(data) {

    container.innerHTML = "";

    const modules = {};

    data.forEach(item => {

        if (!modules[item.module]) {
            modules[item.module] = [];
        }

        modules[item.module].push(item);

    });

    Object.keys(modules).forEach(moduleName => {

        const section = document.createElement("div");
        section.className = "module";

        section.innerHTML = `
            <div class="module-title">${moduleName}</div>
            <div class="cards">
                ${modules[moduleName].map(item => `
                    <div class="card"
                         id="${item.module}-${item.code}">
                        <div class="code">
                            ${item.code}
                        </div>

                        <div class="desc">
                            ${item.description}
                        </div>
                    </div>
                `).join("")}
            </div>
        `;

        container.appendChild(section);

    });

    resultsCount.textContent =
        "عدد النتائج: " + data.length;
}

search.addEventListener("input", () => {

    const q = search.value.trim().toLowerCase();

    document
        .querySelectorAll(".card")
        .forEach(card => card.classList.remove("highlight"));

    if (!q) {

        render(allData);

        return;
    }

    const filtered = allData.filter(item =>

        item.code.toLowerCase().includes(q)

        ||

        item.description.toLowerCase().includes(q)

        ||

        item.module.toLowerCase().includes(q)
    );

    render(filtered);

    setTimeout(() => {

        const firstCard =
            document.querySelector(".card");

        if (firstCard) {

            firstCard.classList.add("highlight");

            firstCard.scrollIntoView({
                behavior:"smooth",
                block:"center"
            });

        }

    },100);
});

loadData();