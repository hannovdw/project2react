import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

var classjson = {};
var phonebool = "";
var reclick = '!!! PRESS UPLOAD BUTTON AGAIN !!!';
var idbool = "";
var carregbool = '';
var emailbool = "";
var empidbool = '';
var filetype = '';
var emailwrong = true;
var idwrong = true;
var carregwrong = true;
var phonewrong = true;
var filetypeext = '';


class App extends Component {

//CONSTRUCTOR.....................................
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
  }
//CONSTRUCTOR.....................................

//FILE UPLOAD ONCHANGE........................................
onChangeHandler=event=>{
  this.setState({
    selectedFile: event.target.files[0],
    loaded: 0,
  })
}//FILE UPLOAD ONCHANGE........................................


//BUTTON ONCLICK............................................
onClickHandler = () => {
  const data = new FormData() 
  data.append('file', this.state.selectedFile)
  axios.post("http://localhost:3000/api/postfile", data, { 
    // receive two    parameter endpoint url ,form data
  })
  .then(res => { // then print response status
    classjson = res.data;
    emailbool="";
    phonebool = "";
    idbool = "";
    carregbool = "";
    empidbool = "";
    filetype = "";
    if(classjson.phone === true){
       phonebool = 'Phone Number'
       reclick = "";
    }
    if(classjson.phone === false){
      reclick = "";
   }
    if(classjson.email === true) emailbool = 'Email Adress'
    if(classjson.id === true) idbool = 'ID Number'
    if(classjson.carreg === true) carregbool = 'Car Registration Number'
    if(classjson.empid !== ""){
    empidbool = classjson.empid;
    alert('File uploaded succesfully');
    if(classjson.filetype!== ''){
    filetype = 'File Type: '+classjson.filetype;
    filetypeext = classjson.filetype;
    }

    }
 })
}
//BUTTON ONCLICK............................................

//ONCLICK AND STATE FOR BUTTONS................................
onClassifyHandler = () => {
  this.setState({showContents: true});
}
state = {
  showContents: false
}
//ONCLICK AND STATE FOR BUTTONS................................

//RADIO BUTTON ON CLICK ...............................
onEmailRadio = () => {
 emailwrong = false;
 console.log('email');
}
onIdRadio = () => {
  idwrong = false;
  console.log('id');
 }
onPhoneRadio = () => {
  phonewrong = false;
  console.log('phone');
 }
 onRegRadio = () => {
  carregwrong = false;
  console.log('reg');
 }
//RADIO BUTTON ON CLICK ...............................

// STORE TO DB BUTTON HANDLER......................
onClickStore = () => {
  var data = {"phone":phonewrong, "id":idwrong, "email": emailwrong, "carreg":carregwrong, "empid":empidbool, "filetype": filetypeext};
  axios.post("http://localhost:3000/api/storedata", data, { 
    // receive two    parameter endpoint url ,form data
  })
  .then(res => {
    alert(res);
    console.log(res);
    })
  }

// STORE TO DB BUTTON HANDLER......................


render(){
    return(
      <div className="main">

        <h1 className="headingmain">Orion</h1>
        <h2 className = "head">File Classification Software</h2>
        <h2 className="head">_________________________________________________________________</h2>
        <br/>
        <form>
          <div >
          <h2 className="head2">The first line of your document must contain the employee ID...</h2>
            <h2 className="head2">Choose a file and click upload button :</h2>
          <input type="file" className="fileup" name="file" onChange={this.onChangeHandler}/>
          <br/>
          <button type="button" className="button" onClick={this.onClickHandler}>Upload</button>
          <br/>
          <br/>
          <h2 className="head">_________________________________________________________________</h2>

          <h2 className="head2">Click classify file button to classify your file:</h2>
          <button type="button" className="button2" onClick={this.onClassifyHandler}>Classify File</button>
          <br/>
          <br/>
          <br/>
          {this.state.showContents && <p className="list">
          <h2 className = "head3"><u>File type and employee number</u></h2>
            <p>Employee ID: {empidbool}</p>
            {filetype}
            <h2 className = "head3"><u>Classified information inside your document:</u></h2>
            {reclick}
            {phonebool}
            <br/>
            {idbool}
            <br/>
            {carregbool}
            <br/>
            {emailbool}
            <br/>
            <br/>

            <h2 className = "head3"><u>Choose any incorectly classified data below: </u></h2>
            <br/>
            Email Adress:<input type = "checkbox" onChange={this.onEmailRadio}/>
            <br/>
            ID Number:<input type = "checkbox" onChange={this.onIdRadio}/>
            <br/>
            Phone Number:<input type = "checkbox" onChange={this.onPhoneRadio}/>
            <br/>
            Car Registration :<input type = "checkbox" onChange={this.onRegRadio}/>
            <br/>
            <br/>
            <button className="button3" onClick={this.onClickStore}>Confirm and Store</button>
            <br/>
            <br/>
            <br/>
            </p>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default App;
