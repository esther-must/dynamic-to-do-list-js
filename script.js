// Set up event listener for page load
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map((taskItem) => taskItem.firstChild.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create the addTask function
    function addTask(taskText, save = true) {

        // Trim the input value
        taskText = taskText.trim();
        
        // Prevent adding an empty task
        if (!taskText.trim()) {
            alert("Please enter a task.");
            return;
        }

        // Task creation
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        // Create a new button for removing task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        
        // Add the 'remove-btn' class to the button using classList.add
        removeButton.classList.add("remove-btn");

        // Add an onclick event listener to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            saveTasks();
        };

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Save to Local Storage if the save flag is true
        if (save) {
            saveTasks();
        }
    }

    // Attach event listener for the Add Task button
    addButton.addEventListener("click", () => addTask(taskInput.value));

    // Event listener for the Enter key in the input field
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
