let allCodes = [];

async function loadData() {

    const response = await fetch("data.json");

    allCodes = await response.json();

    render(allCodes);
}

function render(data){

    const container = document.getElementById("container");

    let groups = {};

    data.forEach(item => {

        if(!groups[item.module]){
            groups[item.module] = [];
        }

        groups[item.module].push(item);
    });

    container.innerHTML = "";

    Object.keys(groups).forEach(module => {

        const section = document.createElement("div");

        section.className = "section";

        section.innerHTML = `
            <div class="section-title">${module}</div>

            <div class="cards">

                ${groups[module].map(item => `

                    <div class="card"
                         data-code="${item.code}"
                         data-desc="${item.description}">

                        <div class="code">${item.code}</div>

                        <div class="desc">
                            ${item.description}
                        </div>

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

    let value = this.value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.classList.remove("highlight");

    });

    if(value === "") return;

    let firstMatch = null;

    cards.forEach(card => {

        let code =
            card.dataset.code.toLowerCase();

        let desc =
            card.dataset.desc.toLowerCase();

        if(
            code.includes(value)
            ||
            desc.includes(value)
        ){

            card.classList.add("highlight");

            if(!firstMatch){

                firstMatch = card;

            }
        }

    });

    if(firstMatch){

        firstMatch.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

});

loadData();