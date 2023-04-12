import { useState } from "react";
  
function FormSending() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        if(e.target.name === "id") {
            setId(e.target.value);
        } else if(e.target.name === "name") {
            setName(e.target.value);
        } else if(e.target.name === "description") {
            setDescription(e.target.value);
        }
    };
  //envoie les données saisies par l'utilisateur au fichier PHP updateItem.php en utilisant l'API Fetch.
    const handleSubmit = (e, url) => {
        e.preventDefault();
        var formData = new FormData();

        formData.append('id', id);
        formData.append('name', name);
        formData.append('description', description);
        
       

        fetch(url, {
          method: "POST",
          body: formData,
        }).then(response => {
            return response.json();
        }).then(json => {
            setResponseMessage("Le serveur a repondu: \"" + json.message + "\""); 
        });
    };
  
    return (
        <div className="App">
            <form
                action="#"
                method="post"
                onSubmit={(event) => handleSubmit(event,"http://localhost/restAPI/update_item.php")}
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
  
export default FormSending;
