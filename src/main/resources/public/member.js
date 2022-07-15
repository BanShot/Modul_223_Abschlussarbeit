const URL = 'http://localhost:8081';
let members = [];
let mode = 'create';
let currentMember;


// API Requests
const createMember = (member) => {
    fetch(`${URL}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
    }).then((result) => {
        result.json().then((member) => {
            members.push(member);
            renderMember();
        });
    });
};

const indexMembers = () => {
    fetch(`${URL}/members`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            members = result;
            renderMember();
        });
    });
    renderMember();
};

const deleteMember = (id) => {
    fetch(`${URL}/members/${id}`, {
        method: 'DELETE'
    }).then((result) => {
        indexMembers();
    });
};

const updateMember = (member) => {
    fetch(`${URL}/members/${member.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
    }).then((result) => {
        result.json().then((member) => {
            members = members.map((e) => e.id === member.id ? member : e);
            renderMember();
        });
    });
}

// Rendering
const resetForm = () => {
    const memberForm = document.querySelector('#memberForm');
    memberForm.reset();
    mode = 'create';
    currentMember = null;
}

const saveForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const member = {};
    member['vorname'] = formData.get('vorname');
    member['nachname'] = formData.get('nachname');
    member['username'] = formData.get('username');
    member['password'] = formData.get('password');

    if (mode === 'create') {
        createMember(member);
    } else {
        member.id = currentMember.id;
        updateMember(member);
    }
    resetForm();
}

const editMember = (member) => {
    mode = 'edit';
    currentMember = member;

    const memberForm = document.querySelector('#memberForm');
    const vornameField = memberForm.querySelector('[name="vorname"]');
    vornameField.value = member.vorname;
    const nachnameField = memberForm.querySelector('[name="nachname"]');
    nachnameField.value = member.nachname;
    const usernameField = memberForm.querySelector('[name="username"]');
    usernameField.value = member.username;
    const passwordField = memberForm.querySelector('[name="password"]');
    passwordField.value = member.password;
}

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const createActions = (entry) => {
    const cell = document.createElement('td');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteMember(members.id));
    cell.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editMember(members));
    cell.appendChild(editButton);

    return cell;
}

const renderMember = () => {
    const display = document.querySelector('#memberDisplay');
    display.innerHTML = '';
    members.forEach((member) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(members.id));
        row.appendChild(createCell(members.vorname));
        row.appendChild(createCell(members.nachname));
        row.appendChild(createCell(members.username));
        row.appendChild(createCell(members.password));
        row.appendChild(createActions(members));
        display.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const memberForm = document.querySelector('#memberForm');
    memberForm.addEventListener('submit', saveForm);
    memberForm.addEventListener('reset', resetForm);
    indexMembers();
});