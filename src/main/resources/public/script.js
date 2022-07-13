const URL = 'http://localhost:8081';
let skis = [];
let mode = 'create';
let currentSki;

const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

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
    ski['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    ski['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));

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
    const checkInDateField = skiForm.querySelector('[name="checkInDate"]');
    checkInDateField.value = ski.checkIn.split('T')[0];
    const checkInTimeField = skiForm.querySelector('[name="checkInTime"]');
    checkInTimeField.value = ski.checkIn.split('T')[1].slice(0, -3);
    const checkOutDateField = skiForm.querySelector('[name="checkOutDate"]');
    checkOutDateField.value = ski.checkOut.split('T')[0];
    const checkOutTimeField = skiForm.querySelector('[name="checkOutTime"]');
    checkOutTimeField.value = ski.checkOut.split('T')[1].slice(0, -3);
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
    skis.forEach((entry) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(skis.id));
        row.appendChild(createCell(new Date(skis.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(skis.checkOut).toLocaleString()));
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