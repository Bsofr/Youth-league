let isAdmin = false;

let leagues = JSON.parse(localStorage.getItem("leagues")) || [
  {name:"U15", teams:[], matches:[]},
  {name:"U17", teams:[], matches:[]},
  {name:"U19", teams:[], matches:[]},
  {name:"Tứ Hùng", teams:[], matches:[]}
];

function save(){
  localStorage.setItem("leagues", JSON.stringify(leagues));
}

function login(){
  let pass = prompt("Nhập mật khẩu");
  if(pass === "admin123"){
    isAdmin = true;
    alert("Đã vào admin");
  }
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function render(){
  let sel = document.getElementById("leagueSelect");
  let selMatch = document.getElementById("leagueMatch");

  sel.innerHTML="";
  selMatch.innerHTML="";

  leagues.forEach((l,i)=>{
    sel.add(new Option(l.name,i));
    selMatch.add(new Option(l.name,i));
  });

  renderTeams();
  renderMatches();
}

function renderTeams(){
  let idx = leagueSelect.value;
  let div = document.getElementById("teamList");
  div.innerHTML="";

  leagues[idx].teams.forEach(t=>{
    div.innerHTML += `<div class="team">${t}</div>`;
  });
}

function renderMatches(){
  let idx = leagueMatch.value;
  let div = document.getElementById("matchList");
  div.innerHTML="";

  leagues[idx].matches.forEach((m,i)=>{
    div.innerHTML += `
      <div class="match">
        ${m.t1} vs ${m.t2} - ${m.date}<br>
        <input onchange="updateScore(${i},0,this.value)">
        <input onchange="updateScore(${i},1,this.value)">
        ${m.s1 ?? "-"} - ${m.s2 ?? "-"}<br>
        <a href="${m.video || '#'}" target="_blank">Video</a>
      </div>
    `;
  });
}

function addTeam(){
  if(!isAdmin) return alert("Không có quyền");

  let idx = leagueSelect.value;
  let name = teamName.value;

  leagues[idx].teams.push(name);
  save(); render();
}

function addMatch(){
  if(!isAdmin) return alert("Không có quyền");

  let idx = leagueMatch.value;

  leagues[idx].matches.push({
    t1: team1.value,
    t2: team2.value,
    date: date.value,
    s1:null,
    s2:null,
    video:""
  });

  save(); render();
}

function updateScore(i,t,val){
  if(!isAdmin) return;

  let idx = leagueMatch.value;

  if(t==0) leagues[idx].matches[i].s1 = val;
  else leagues[idx].matches[i].s2 = val;

  save(); render();
}

render();
