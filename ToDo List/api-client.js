// The URL used for the Fetch requests
let url = "http://localhost:3000/";

// GET function
async function getContent()
{
  try
  {
    const response = await fetch(url, 
      {
        headers: { 'Content-Type': 'application/json'}
      });

    if (response.ok == false)
    {
      throw new Error ('An error has occurred: ' + response.status);
    }

    const responseInJSON = await response.json();
    return responseInJSON;
  }

  catch (error)
  {
    console.error ('Error: ' + error);
  }
};


// POST function
// A post is made with 'task' as description
async function postContent(task)
{
  try
  {
    // Make a "data package" of a given 'description' and a 'done' state (set to 'false')
    const data = {description: task, done: false};

    const response = await fetch(url, 
      {
        method:   "POST",
        body:     JSON.stringify(data),
        headers:  {'Content-Type': 'application/json'}
      });

    if (response.ok == false)
    {
      throw new Error ('An error has occurred: ' + response.status);
    }

    return;
  }

  catch (error)
  {
    console.error('Error: ' + error);
  }
};


// PUT function to alter the 'description' of an existing post
async function putContentTask(id, task, checked)
{
  try
  {
    // Make a "data package" of a (new) given 'description' and a 'done' state (set to what it already was)
    const data = {description: task, done: checked};

    const response = await fetch(url + id, 
      {
        method:   "PUT",
        body:     JSON.stringify(data),
        headers:  {'Content-Type': 'application/json'}
      });

    if (response.ok == false)
    {
      throw new Error ('An error has occurred: ' + response.status);
    }

    return;
  }

  catch (error)
  {
    console.error('Error: ' + error);
  }
};


// // PUT function to alter the 'done' state of an existing post
async function putContentDone(id, checked, description)
{
    // Toggle the 'checked' state from 'false' to 'true', or vice versa
    checked = !checked;

  try
  {
    // Make a "data package" of the old 'description' and an altered 'done' state
    const data = {description: description, done: checked};
    const response = await fetch(url + id, 
      {
        method:   "PUT",
        body:     JSON.stringify(data),
        headers:  {'Content-Type': 'application/json'}
      });

    if (response.ok == false)
    {
      throw new Error ('An error has occurred: ' + response.status);
    }

    return;
  }

  catch (error)
  {
    console.error('Error: ' + error);
  }
};


// DELETE function
async function deleteContent(id) 
{
  try
  {
    const response = await fetch((url+id), 
    {
      method: "DELETE"
    });

    if (response.ok == false)
    {
      throw new Error ('An error has occurred: ' + response.status);
    }

    return;
  }
  
  catch (error)
  {
    console.error('Error: ' + error);
  }
};
