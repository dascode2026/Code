const data = {
  ABA: [
    { code: "0110", desc: "جهد منخفض" },
    { code: "0111", desc: "جهد مرتفع" }
  ],
  ART: [
    { code: "0200", desc: "عطل حساس الرادار" }
  ],
  BS: [
    { code: "0160", desc: "CAN Bus" }
  ],
  BTS: [
    { code: "0110", desc: "عطل داخلي" }
  ],
  EDW: [
    { code: "F050", desc: "إنذار" }
  ]
};

/* ================= تشغيل مباشر وآمن ================= */
let allResults = [];

/* بناء البيانات مباشرة */
function buildDatabase(){

  allResults = [];

  for(let section in data){

    if(!Array.isArray(data[section])) continue;

    data[section].forEach(item=>{
      allResults.push({
        section,
        code: String(item.code),
        desc: String(item.desc)
      });
    });

  }
}

/* ================= عرض ================= */
function renderList(list){

  const box = document.getElementById("list");
  if(!box) return;

  box.innerHTML = "";

  list.forEach(item=>{

    const div = document.createElement("div");

    div.innerHTML = `
      <b>${item.code}</b> - ${item.desc}
      <small style="display:block;color:#888">${item.section}</small>
    `;

    div.onclick = () => showDetails(item);

    box.appendChild(div);

  });

  document.getElementById("resultCount").innerText =
  "Results: " + list.length;

}

/* ================= بحث ================= */
function searchCode(){

  const input = document.getElementById("search");
  if(!input) return;

  const value = input.value.trim().toUpperCase();

  if(value === ""){
    renderList(allResults);
    return;
  }

  const filtered = allResults.filter(item=>{
    return item.code.includes(value) ||
           item.desc.toUpperCase().includes(value);
  });

  renderList(filtered);
}

/* ================= تفاصيل ================= */
function showDetails(item){

  const box = document.getElementById("details");
  if(!box) return;

  box.innerHTML = `
    <div class="card">

      <div class="code">${item.code}</div>

      <div class="desc">${item.desc}</div>

      <hr>

      <div>System: ${item.section}</div>

    </div>
  `;
}

/* ================= تشغيل مضمون 100% ================= */
window.addEventListener("load", function(){
  buildDatabase();
  renderList(allResults);
});