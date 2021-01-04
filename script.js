let notes = [];
loadStorage();

var person = {
    name: "John",
    login: "login",
    password: 12345
}

document.getElementById('enter').onclick = (e) => {
    e.preventDefault();

    checkData();
}


function checkData() {
    let logValue = document.getElementById('login');
    let pasValue = document.getElementById('password');

    if (logValue.value != person.login || +(pasValue.value) != person.password) {
        alert("Ваш логин или пароль неверный");
        logValue.value = "";
        pasValue.value = "";
    } else {
        alert('Привет, ' + person.name);
        document.getElementById('authorization').style.display = 'none';
        document.getElementById('main').style.display = 'contents';
    }
}


document.getElementById('delete').onclick = (e) => {
    e.preventDefault();
    localStorage.clear();
}

document.getElementById('add').onclick = (e) => {
    e.preventDefault();

    let name = document.getElementById('name');
    let body = document.getElementById('body');

    let note = {
        name: name.value,
        body: body.value,
        date: Math.floor(Date.now() / 1000),

    };

    name.value = "";
    body.value = "";

    notes.push(note);

    saveNotes();
    showNotes();
}




function loadStorage() {
    if (localStorage.getItem('notes')) notes = JSON.parse(localStorage.getItem('notes'));
    showNotes();
}


function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function showNotes() {
    let field = "";

    notes.forEach(item => {
        field += `<p class="text-right small"><em>${timeConverter(item.date)}</em></p>`
        field += `<p class="alert alert-primary">${item.name}</p>`
        field += `<p class="alert alert-success">${item.body}</p>`
    })

    document.getElementById('note-field').innerHTML = field;
}



function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
}