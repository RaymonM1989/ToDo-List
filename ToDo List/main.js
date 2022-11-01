

// Function to DISPLAY the CURRENT TASKS in the database
function displayTasks(data)
{
  // Find the 'ul' element which holds all ('li' elements containing the) Tasks
  const ulElement = document.getElementById("list");
  // Get all 'li' elements (all Tasks) currently in the 'ul' element  
  let list = ulElement.getElementsByTagName("li");
  // Make an Array from all 'li' elements (all Tasks) currently in the 'ul' element
  let listArray = Array.from(list);
  
  // Remove every 'li' element (Task) from the 'ul' element 
  listArray.forEach(function ()
  { ulElement.removeChild(list[0]); });

  // GET request from Database
  const getContentResult = getContent();
  getContentResult.then((data) => 
  {
    // For every entry in the database, create a new 'li' element and add the entry's description  
    data.forEach(function (task)
    {
      // Create new LIST ITEM
      let newListItem = document.createElement("li");
      newListItem.className = "listedTask";

      // Create new TASK NAME
      let newText = document.createElement("H4");
      newText.id = "text" + task._id;
      // Add functionality to change the text when clicking on it
      AddChangeTextFunctionality(newText, task._id, task.done);

      // Create new REMOVE BUTTON
      let newButton = document.createElement("button");
      newButton.className = "removeTaskButton";
      // Add functionality to Remove the task when clicking the button
      AddRemoveButtonFunctionality(newButton, task._id);

      // Create new CHECKBOX
      let newCheckbox = document.createElement("input");
      newCheckbox.className = "checkbox";
      newCheckbox.setAttribute("type", "checkbox");

      // Check 'checked' status (from the Database) and adjust checkbox visualisation accordingly
      if (task.done == false)
      {
        newCheckbox.checked = false;
        newText.innerHTML = task.description;
      }
      else
      {
        newCheckbox.checked = true;
        // Cross out text description
        newText.innerHTML = "<del>" + task.description + "</del>";
      }
      // Add functionality to Check off the task (and send that info to the Database)
      AddCheckBoxFunctionality(newCheckbox, task.done, task.description, task._id);

      // Add the new 'li' element to the 'ul' element
      ulElement.appendChild(newListItem);
      // Add the new 'checkbox' to the 'li' element
      newListItem.appendChild(newCheckbox);
      // Add the 'text description' to the 'li' element
      newListItem.appendChild(newText);
      // Add the 'remove button' to the 'li' element
      newListItem.appendChild(newButton);
    });
  });

  // Display the contents from the GET request in the Log as well
  GETtoLog();
};


// Function to display the GET results to the log
const GETtoLog = function()
{
  const getContentResult = getContent();
  getContentResult.then((data) => console.log(data));
};


// Function to ADD a TASK to the Database
let addTask = function() 
{
  // If the 'input field' is empty, ask the user to enter a Task Description
  if (document.getElementById("inputField").value == "" || document.getElementById("inputField").value == null) 
  {
    alert("Please enter a Task Description");
    return;
  }
  // If the 'input field' is not empty, POST a new task to the database with the current description
  else
  {
    // Display 'Task Added' message to the log
    console.log ("Task: '" + document.getElementById("inputField").value + "' got ADDED");

    // POST a new task to the database with the current description
    const postContentResult = postContent(document.getElementById("inputField").value);
    postContentResult.then(() => 
    {
      // After posting, reload the Task list
      const getContentResult = getContent();
      getContentResult.then((data) => 
      {
        displayTasks(data);
      })

      // Reset the 'input field'
      document.getElementById("inputField").value = "";
    });
  };
}


// Create Event Listener for clicking the 'Add Task' button
document.getElementById("addButton").addEventListener("click", function() 
{ addTask() });
// Create Event Listener for pressing the [ENTER] key
document.addEventListener("keypress", function (e) 
{ if (e.key === "Enter") { addTask(); } });


// Function to make the 'Delete button' make a DELETE request to the database
const AddRemoveButtonFunctionality = function(button, id)
{
  button.addEventListener("click", function() 
  { 
    // Display 'Task Deleted' message to the log
    console.log("Task '" + id + "' got DELETED");

    const deleteContentResult = deleteContent(id);
    deleteContentResult.then(() => displayTasks() );
  });
};


// Function to make the 'Checkbox' toggle the 'checked' state of a task (with a PUT request to the database)
const AddCheckBoxFunctionality = function(checkbox, checked, description, id)
{
  checkbox.addEventListener("change", function()
  {
    // If the Checkbox is 'checked' after clicking on it, display 'Task Done' message to the log
    if (this.checked) { console.log("Task '" + id + "' is DONE"); }
    // If the Checkbox is 'unchecked' after clicking on it, display 'Task Unchecked' message to the log
    else              { console.log("Task '" + id + "' is UNCHECKED"); }

    const putContentDoneResult = putContentDone(id, checked, description);
    putContentDoneResult.then(() => displayTasks() );
  })
};


// Function to make it possible to click the 'Task Description' to alter it (with a PUT request to the database)
const AddChangeTextFunctionality = function(text, id, checked)
{
  text.addEventListener("click", function() 
  { 
    // Show the user a Promt to enter a new Task Description
    let taskName = prompt ("Please type a new name for this Task:", "New Task Name");

    // If the user entered a new Task Description, change the Description in the database (with a PUT request)
    if (taskName != null)
    {
      // Display 'Task Updated' message to the log
      console.log("Task '" + id + " UPDATED its name");

      const putContentTaskResult = putContentTask(id, taskName, checked);
      putContentTaskResult.then(() => displayTasks() );
    }
  });
};


// Load the current Database when the page loads
displayTasks();









