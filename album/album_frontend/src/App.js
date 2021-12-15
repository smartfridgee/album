import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {

  render(){
    let base64img, binaryBlob, blobData;
    let selectedIndex = 0;

function previewFile() {
      const preview = document.querySelector('img');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();
    
      reader.addEventListener("load", function () {
        // convert image file to base64 string
        base64img = reader.result;
        preview.src = reader.result;

        blobData = (reader.result).split(',')[1];
        binaryBlob = btoa(blobData);
      }, false);
    
      if (file) {
        reader.readAsDataURL(file);
      }
    }

    function copyBaseToClipboard() {
      //if(base64img == "") { return alert("Select image first!") }
      navigator.clipboard.writeText(base64img);

      //alert("Copied!");
    }

    function copyBlobToClipboard(){
      navigator.clipboard.writeText(binaryBlob);
    }

    async function sendToDB(){

      let data = {"type": "data:image/jpg;base64," , "imgcode": binaryBlob };
      console.log(data);

      await fetch('http://localhost:4000/upload', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          })
          .then(response => response.text())
          .then(data => {
              console.log(data);
          })
          .catch((error) => {
          console.error('Error:', error);
      });
    }

    async function loadImageFromDB(){
      await fetch('http://localhost:4000/images')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let link = data[selectedIndex].dataType + atob(data[selectedIndex].imgCode);
          let img = document.querySelector('img');
          img.src = link;
      });
    }

    function updateIndex(event) { selectedIndex = event.currentTarget.value; console.log(selectedIndex) }

    return(
      <div className="App">
        <header><h1>Img to Base64</h1></header>
        <input type="file" id="imgbox" onChange={previewFile} />
        <img />
        <div className="container">
          <button onClick={copyBaseToClipboard}>Copy Base64</button>
          <button onClick={copyBlobToClipboard}>Copy Binary</button>
          <button onClick={sendToDB}>Send to DB</button>
          <button onClick={loadImageFromDB}>Load from DB</button>
          <input style={ { width: "3em" } }type="number" onChange={updateIndex}></input>
        </div>
      </div>
    )
  }
}

export default App;
