// Set up event listener for page load
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Create the addTask function
    function addTask() {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if taskText is empty
        if (taskText === "") {
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
        };

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach event listener for the Add Task button
    addButton.addEventListener("click", addTask);

    // Event listener for the Enter key in the input field
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
