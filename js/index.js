const list = document.querySelector('ul')
const input = document.querySelector('input')
const BACK_END_URL = 'http://localhost:3001';

input.disabled = true

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class','list-group-item')
    li.innerHTML = task
    list.append(li)
}

const getTasks = async () => {
    try {
        const response = await fetch(BACK_END_URL)
        const json = await response.json()
        json.forEach(task => {
            renderTask(task.description)
        })
        input.disabled = false
    } catch (error) {
        alert('Error retrieving tasks' + error.message)
    }
}

const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description: task})
        const response = await fetch(BACK_END_URL + '/new',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert('Error retrieving tasks' + error.message)
    }
}


input.addEventListener('keypress',(event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== '') {
            saveTask(task).then((json)=> {
                renderTask(task)
                input.value = ''
            })
        }
    }
})

getTasks()