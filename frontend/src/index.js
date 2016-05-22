import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';



ReactDOM.render(<App/>, 
  document.getElementById('app')  );



// var data = [
//   {
//     name: "Jonathan Wilkinson",
//     id: "89300",
//     party: "Liberal",
//     riding: "North Vancouver",
//     riding_id: "918",
//     languages: "English",
//     // photo: "http://www.parl.gc.ca/Parliamentarians/Images/OfficialMPPhotos/42/WilkinsonJonathan_Lib.jpg",
//     photo: "",

//     phone: "604-775-6333",
//     address: [
//     "102 - 3rd Street West (Main Office)",
//     "North Vancouver, British Columbia",
//     "V7M 1E8"
//     ],
//     email: "Jonathan.Wilkinson@parl.gc.ca"
//   }
// ]



// ReactDOM.render(<App data={shuffleArray(data)}/>, document.getElementById('app'));