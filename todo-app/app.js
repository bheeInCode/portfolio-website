// Select DOM elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const completedTasksList = document.getElementById("completed-tasks-list");

const allTasksBtn = document.getElementById("all-tasks");
const completedTasksBtn = document.getElementById("completed-tasks");
const incompleteTasksBtn = document.getElementById("incomplete-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Event listener to add a new task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            text: taskText,
            completed: false,
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = ""; // Clear input field
    }
});

// Function to render tasks
function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    completedTasksList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
        filteredTasks = tasks.filter((task) => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add(task.completed ? "completed" : "");
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <i class="fas fa-check" onclick="toggleComplete(${index})"></i>
                <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
            </div>
        `;
        taskList.appendChild(taskItem);

        if (task.completed) {
            const completedItem = document.createElement("li");
            completedItem.textContent = task.text;
            completedTasksList.appendChild(completedItem);
        }
    });
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter buttons
allTasksBtn.addEventListener("click", () => renderTasks("all"));
completedTasksBtn.addEventListener("click", () => renderTasks("completed"));
incompleteTasksBtn.addEventListener("click", () => renderTasks("incomplete"));

// Initial rendering of tasks
renderTasks();
