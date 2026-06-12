let allCodes = [];

async function loadData() {

    const response = await fetch("data.json");

    allCodes = await response.json();

    render(allCodes);
}

function render(data) {

    const container = document.getElementById("container");

    container.innerHTML = "";

    document.getElementById("resultCount").innerText =
        "عدد النتائج: " + data.length;

    let groups = {};

    data.forEach(item => {

        if(!groups[item.module]){
            groups[item.module] = [];
        }

        groups[item.module].push(item);
    });

    Object.keys(groups).forEach(module => {

        let section = document.createElement("div");

        section.className = "section";

        section.innerHTML = `
            <div class="section-title">${module}</div>

            <div class="cards">

            ${groups[module].map(item => `

                <div class="card">

                    <div class="code">${item.code}</div>

                    <div class="desc">${item.description}</div>

                </div>

            `).join("")}

            </div>
        `;

        container.appendChild(section);
    });
}

document
.getElementById("search")
.addEventListener("input", function(){

    let q = this.value.toLowerCase();

    let result = allCodes.filter(item =>

        item.code.toLowerCase().includes(q)

        ||

        item.description.toLowerCase().includes(q)

        ||

        item.module.toLowerCase().includes(q)

    );

    render(result);

    setTimeout(()=>{

        let firstCard =
            document.querySelector(".card");

        if(firstCard){

            firstCard.classList.add("highlight");

            firstCard.scrollIntoView({
                behavior:"smooth",
                block:"center"
            });
        }

    },50);
});

loadData();