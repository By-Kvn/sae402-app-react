import { useState } from "react";

function FormSendingPhp() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "name") setName(e.target.value);
    else if (e.target.name == "description") setDescription(e.target.value);
  };

  const handleSubmit = (e, url) => {
    e.preventDefault();
    var formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setResponseMessage('Le serveur a repondu: "' + json.message + '"');
      });
  };

  return (
    <div className="App">
      <form
        action="#"
        method="post"
        onSubmit={(event) =>
          handleSubmit(event, "http://localhost/restAPI/createItem.php")
        }
      >
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <label htmlFor="name">Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>{responseMessage}</h1>
    </div>
  );
}

export default FormSendingPhp;
