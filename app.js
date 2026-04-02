// ===== DATA =====
let teams = JSON.parse(localStorage.getItem("teams")) || [];
let matches = JSON.parse(localStorage.getItem("matches")) || [];

// ===== NAV =====
function show(id) {
    document.querySelectorAll('.container > div').forEach(d => d.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// ===== LOGIN =====
function login() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === "admin" && p === "123") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
    } else {
        alert("Sai tài khoản!");
    }
}

// ===== TEAM =====
function addTeam() {
    let name = document.getElementById("teamName").value;

    if (!name) return alert("Nhập tên đội!");

    teams.push(name);
    localStorage.setItem("teams", JSON.stringify(teams));

    renderTeams();
    document.getElementById("teamName").value = "";
}

function renderTeams() {
    let html = "";

    teams.forEach(t => {
        html += `<div class="card">${t}</div>`;
    });

    document.getElementById("teamList").innerHTML = html;
}

// ===== MATCH =====
function addMatch() {
    let a = document.getElementById("teamA").value;
    let b = document.getElementById("teamB").value;
    let s = document.getElementById("score").value;

    if (!a || !b || !s) return alert("Nhập đủ thông tin!");

    matches.push({ a, b, s });
    localStorage.setItem("matches", JSON.stringify(matches));

    renderMatches();

    document.getElementById("teamA").value = "";
    document.getElementById("teamB").value = "";
    document.getElementById("score").value = "";
}

function renderMatches() {
    let html = "";

    matches.forEach(m => {
        html += `
        <div class="match">
            <div>${m.a}</div>
            <div><b>${m.s}</b></div>
            <div>${m.b}</div>
        </div>`;
    });

    document.getElementById("matchList").innerHTML = html;
}

// ===== INIT =====
renderTeams();
renderMatches();
