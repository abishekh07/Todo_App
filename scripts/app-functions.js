/* ------------------- Local Storage --------------------- */

const saveTasks = () => {
  localStorage.setItem('Tasks', JSON.stringify(taskArr))
}

const getTasks = () => {
  const storedTasks = localStorage.getItem('Tasks')

  return storedTasks ? JSON.parse(storedTasks) : []
}

/* -------------------------------------------------------- */

/* ------------------- Task Events ------------------------ */

const toggleTask = (taskId) => {
  const task = taskArr.find((item) => item.id === taskId)
  task.completed = !task.completed
}

const deleteTask = (taskId) => {
  const taskIndex = taskArr.findIndex((item) => item.id === taskId)
  if (taskIndex > -1) taskArr.splice(taskIndex, 1)
}

/* -------------------------------------------------------- */

/* ------------------ Event Listeners --------------------- */

const addEventListeners = (taskId, checkbox, deleteBtn) => {
  checkbox.addEventListener('click', () => {
    toggleTask(taskId)
    saveTasks()
    renderTasks(taskArr)
  })

  deleteBtn.addEventListener('click', () => {
    deleteTask(taskId)
    saveTasks()
    renderTasks(taskArr)
  })
}

/* -------------------------------------------------------- */

/* --------------- Display Tasks on the Page -------------- */

const generateTaskDOM = (task) => {
  const container = document.createElement('div')
  container.classList.add('taskBox')

  const label = document.createElement('label')
  label.classList.add('taskBox__label')

  const customCheckbox = document.createElement('span')
  customCheckbox.classList.add('taskBox__label--custom-checkbox')

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.classList.add('taskBox__label--checkbox')

  checkbox.checked = task.completed

  const title = document.createElement('span')
  title.textContent = task.title
  title.classList.add('taskBox__label--title')

  label.appendChild(checkbox)
  label.appendChild(customCheckbox)
  label.appendChild(title)

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('taskBox__deleteBtn')

  const trashIcon = document.createElement('i')
  trashIcon.setAttribute('class', 'icon ion-md-trash')

  deleteBtn.appendChild(trashIcon)

  container.appendChild(label)
  container.appendChild(deleteBtn)

  addEventListeners(task.id, checkbox, deleteBtn)

  return container
}

/* -------------------------------------------------------- */

const renderTasks = (taskArr) => {
  tasks.innerHTML = ''

  if (taskArr.length === 0) {
    const noTasks = document.createElement('div')
    noTasks.innerHTML = `<i class="ion-ios-sad"></i>
      <p>No tasks to show!</p>`

    noTasks.classList.add('no-tasks')
    noTasks.addEventListener('click', () => {
      form.task.focus()
    })
    tasks.appendChild(noTasks)
  }

  for (let i = 0; i < taskArr.length; i++) {
    const task = generateTaskDOM(taskArr[i])
    tasks.appendChild(task)
  }
}
