const inputTitleEl = document.querySelector('#title-input')
const inputLocalEl = document.querySelector('#local-input')
const inputDateStartEl = document.querySelector('#date-start-input')
const buttonAddEventEl = document.querySelector('#register-btn')
const eventListEl = document.querySelector('.event-container')

buttonAddEventEl.addEventListener('click', () => {
    const title = inputTitleEl.value
    const local = inputLocalEl.value
    const dateStartValue = new Date(inputDateStartEl.value)
    const dateStart = dateStartValue.toISOString()

    createEvent(title, local, dateStart)
})

function deleteEvent(id) {
    fetch('http://localhost:3333/api/events/' + id, { method: 'DELETE' })
        .then(() => {
            getAllEvents()
        })
}

function createEvent(title, local, dateStart) {
    fetch('http://localhost:3333/api/events/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, local: local, dateStart: dateStart })
    })
        .then(() => {
            getAllEvents()
        })
}

function updateEvent(id, title, local, dateStart) {
    fetch('http://localhost:3333/api/events/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, local: local, dateStart: dateStart })
    })
        .then(() => {
            getAllEvents()
        })
}

function editField(event) {
    let editIcon = document.querySelector('#edit-icon-' + event.id)
    let closeIcon = document.querySelector('#close-icon-' + event.id)
    let title = document.getElementById("title-" + event.id)
    let local = document.getElementById("local-" + event.id)
    let dateStart = document.getElementById("date-start-" + event.id)
    let newTitleInput = document.getElementById("newTitle-" + event.id)
    let newLocalInput = document.getElementById("newLocal-" + event.id)
    let newDateStartInput = document.getElementById("newDateStart-" + event.id)
    let saveButton = document.getElementById("button-" + event.id)
    let deleteButton = document.getElementsByClassName("trash-btn")

    editIcon.style.display = "none"
    closeIcon.style.display = "inline-block"

    title.style.display = "none"
    newTitleInput.style.display = "inline-block"
    newTitleInput.value = title.innerText

    local.style.display = "none"
    newLocalInput.style.display = "inline-block"
    newLocalInput.value = local.innerText

    dateStart.style.display = "none"
    newDateStartInput.style.display = "inline-block"
    // newDateStartInput.value = dateStart.innerText

    saveButton.style.display = "inline-block"
}

function closeEdition(event) {
    let editIcon = document.querySelector('#edit-icon-' + event.id)
    let closeIcon = document.querySelector('#close-icon-' + event.id)
    let title = document.getElementById("title-" + event.id)
    let local = document.getElementById("local-" + event.id)
    let dateStart = document.getElementById("date-start-" + event.id)
    let newTitleInput = document.getElementById("newTitle-" + event.id)
    let newLocalInput = document.getElementById("newLocal-" + event.id)
    let newDateStartInput = document.getElementById("newDateStart-" + event.id)
    let saveButton = document.getElementById("button-" + event.id)

    editIcon.style.display = "inline-block"
    closeIcon.style.display = "none"

    title.style.display = "inline-block"
    newTitleInput.style.display = "none"

    local.style.display = "inline-block"
    newLocalInput.style.display = "none"

    dateStart.style.display = "inline-block"
    newDateStartInput.style.display = "none"

    saveButton.style.display = "none"
}

function saveValue(event) {
    let editIcon = document.querySelector('#edit-icon-' + event.id)
    let closeIcon = document.querySelector('#close-icon-' + event.id)
    let title = document.getElementById("title-" + event.id)
    let local = document.getElementById("local-" + event.id)
    let dateStart = document.getElementById("date-start-" + event.id)
    let newTitleInput = document.getElementById("newTitle-" + event.id)
    let newLocalInput = document.getElementById("newLocal-" + event.id)

    let newDateStartInput = document.getElementById("newDateStart-" + event.id)
    let newDateStartValue = new Date(newDateStartInput.value)
    let newDateStart = newDateStartValue.toISOString()

    let saveButton = document.getElementById("button-" + event.id)

    editIcon.style.display = "inline-block"
    closeIcon.style.display = "none"

    title.innerText = newTitleInput.value
    newTitleInput.style.display = "none"
    title.style.display = "inline-block"

    local.innerText = newLocalInput.value
    newLocalInput.style.display = "none"
    local.style.display = "inline-block"

    dateStart.innerText = newDateStart
    newDateStartInput.style.display = "none"
    dateStart.style.display = "inline-block"

    saveButton.style.display = "none"
    updateEvent(event.id, newTitleInput.value, newLocalInput.value, newDateStart)
}

function formatDate(date) {
    let options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return date.toLocaleString('pt-BR', options);
}

function mountEvent(event) {
    const eventEl = document.createElement('label')
    const divEvents = document.createElement('div')
    const divDelete = document.createElement('div')

    const spanEdit = document.createElement('span')
    const spanClose = document.createElement('span')
    const iconEdit = document.createElement('i')
    const iconClose = document.createElement('i')

    const titleEl = document.createElement('p')
    const newTitleInputEl = document.createElement('input')
    const localEl = document.createElement('p')
    const newLocalInputEl = document.createElement('input')
    const dateStartEl = document.createElement('p')
    const newDateStartInputEl = document.createElement('input')

    const saveButtonEl = document.createElement('button')
    const deleteButtonEl = document.createElement('button')

    eventEl.className = 'event-wrapper'
    divEvents.className = 'event-wrapper-inner'
    divDelete.className = 'event-wrapper-inner'

    spanEdit.id = "edit-icon-" + event.id
    spanEdit.addEventListener('click', () => {
        editField(event)
    })
    iconEdit.className = "fa-solid fa-pen-to-square"

    spanClose.id = "close-icon-" + event.id
    spanClose.style.display = "none"
    spanClose.addEventListener('click', () => {
        closeEdition(event)
    })
    iconClose.className = "fa-solid fa-x"

    saveButtonEl.style.display = "none"
    saveButtonEl.type = 'button'
    saveButtonEl.id = 'button-' + event.id
    saveButtonEl.className = 'save-btn'
    saveButtonEl.innerHTML = 'Salvar'
    saveButtonEl.addEventListener('click', () => {
        saveValue(event)
    })

    deleteButtonEl.className = 'trash-btn'
    deleteButtonEl.innerHTML = '<span><i class="fa-regular fa-trash-can"></i></span>'
    deleteButtonEl.addEventListener('click', () => {
        deleteEvent(event.id)
    })

    titleEl.id = "title-" + event.id
    titleEl.innerHTML = event.title
    localEl.id = "local-" + event.id
    localEl.innerHTML = event.local
    dateStartEl.id = "date-start-" + event.id
    let newDateStart = new Date(event.dateStart)
    dateStartEl.innerHTML = formatDate(newDateStart)

    newTitleInputEl.style.display = "none"
    newTitleInputEl.type = 'text'
    newTitleInputEl.id = "newTitle-" + event.id
    newLocalInputEl.style.display = "none"
    newLocalInputEl.type = 'text'
    newLocalInputEl.id = "newLocal-" + event.id
    newDateStartInputEl.style.display = "none"
    newDateStartInputEl.type = 'datetime-local'
    newDateStartInputEl.id = "newDateStart-" + event.id

    spanEdit.appendChild(iconEdit)
    spanClose.appendChild(iconClose)

    divEvents.appendChild(spanEdit)
    divEvents.appendChild(spanClose)
    divEvents.appendChild(titleEl)
    divEvents.appendChild(newTitleInputEl)
    divEvents.appendChild(localEl)
    divEvents.appendChild(newLocalInputEl)
    divEvents.appendChild(dateStartEl)
    divEvents.appendChild(newDateStartInputEl)
    divEvents.appendChild(saveButtonEl)

    divDelete.appendChild(deleteButtonEl)

    eventEl.appendChild(divEvents)
    eventEl.appendChild(divDelete)

    eventListEl.appendChild(eventEl)
}

function getAllEvents() {
    fetch('http://localhost:3333/api/events')
        .then(response => response.json())
        .then(data => {
            if (!data[0]) {
                eventListEl.innerHTML = '<p class="no-events active">Nenhum evento cadastrado.</p>'
            } else {
                eventListEl.innerHTML = ''
                data.forEach(mountEvent)
            }
        })
}

getAllEvents()