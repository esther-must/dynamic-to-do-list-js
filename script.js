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

    // Function to add a task
    function addTask(taskText, save = true) {
        // Trim the input if taskText is retrieved from the input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Prevent adding an empty task
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Task creation logic
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        // Create a new button for removing the task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
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

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Attach event listener for the Add Task button
    addButton.addEventListener("click", () => addTask());

    // Event listener for the Enter key in the input field
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
