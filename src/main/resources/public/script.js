const URL = 'http://localhost:8081';
let skis = [];
let mode = 'create';
let currentSki;


// API Requests
const createSki = (ski) => {
    fetch(`${URL}/skis`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ski)
    }).then((result) => {
        result.json().then((ski) => {
            skis.push(ski);
            renderSkis();
        });
    });
};

const indexSkis = () => {
    fetch(`${URL}/skis`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            skis = result;
            renderSkis();
        });
    });
    renderSkis();
};

const deleteSki = (id) => {
    fetch(`${URL}/skis/${id}`, {
        method: 'DELETE'
    }).then((result) => {
        indexSkis();
    });
};

const updateSki = (ski) => {
    fetch(`${URL}/skis/${ski.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ski)
    }).then((result) => {
        result.json().then((ski) => {
            skis = skis.map((e) => e.id === ski.id ? ski : e);
            renderSkis();
        });
    });
}

// Rendering
const resetForm = () => {
    const skiForm = document.querySelector('#skiForm');
    skiForm.reset();
    mode = 'create';
    currentSki = null;
}

const saveForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ski = {};
    ski['laenge'] = formData.get('laenge');
    ski['breite'] = formData.get('breite');
    ski['gewicht'] = formData.get('gewicht');

    if (mode === 'create') {
        createSki(ski);
    } else {
        ski.id = currentSki.id;
        updateSki(ski);
    }
    resetForm();
}

const editSki = (ski) => {
    mode = 'edit';
    currentSki = ski;

    const skiForm = document.querySelector('#skiForm');
    const laengeField = skiForm.querySelector('[name="laenge"]');
    laengeField.value = ski.laenge;
    const breiteField = skiForm.querySelector('[name="breite"]');
    breiteField.value = ski.breite;
    const gewichtField = skiForm.querySelector('[name="gewicht"]');
    gewichtField.value = ski.gewicht;
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
    deleteButton.addEventListener('click', () => deleteSki(entry.id));
    cell.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editSki(entry));
    cell.appendChild(editButton);

    return cell;
}

const renderSkis = () => {
    const display = document.querySelector('#skiDisplay');
    display.innerHTML = '';
    skis.forEach((skis) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(skis.id));
        row.appendChild(createCell(skis.laenge));
        row.appendChild(createCell(skis.breite));
        row.appendChild(createCell(skis.gewicht));
        row.appendChild(createActions(skis));
        display.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const skiForm = document.querySelector('#skiForm');
    skiForm.addEventListener('submit', saveForm);
    skiForm.addEventListener('reset', resetForm);
    indexSkis();
});