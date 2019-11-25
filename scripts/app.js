const date = document.querySelector('.content__date')

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
const time = new Date()

date.innerHTML = `${days[time.getDay()]}, ${
  months[time.getMonth()]
} ${time.getDate()}`

/* 
  ----------------------- App functionality --------------------------
*/

const taskArr = getTasks()

const form = document.querySelector('.form')
const tasks = document.querySelector('.tasks')

renderTasks(taskArr)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  taskArr.push({
    id: uuidv4(),
    title: e.target.task.value,
    completed: false
  })

  e.target.task.value = ''

  tasks.innerHTML = ''

  saveTasks()
  renderTasks(taskArr)
})
