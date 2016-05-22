import React from 'react';
import Navbar from './Navbar.jsx';
import MpFooter from './MpFooter.jsx';

import SingleMpView from './SingleMpView.jsx';

import AllMpView from './AllMpView.jsx';



class App extends React.Component {
  
  state = {
    selectedMP: null
  }

  render() {

    var mps = []

    $.ajax({
      url: 'http://localhost:3000/members',
      dataType: "json",
      async: false,
      data: mps
    }).done(function(res) {
      mps = res
    }).fail(function(res){
    })


    const componentToRender = this.state.selectedMP
    ? <SingleMpView
        mp = {this.state.selectedMP}
        data = { mps}
      /> 
    : <AllMpView 
        data = { mps }
        onChange = { this._changeSelectedMp }
    />

    return (
 
      <div>
        <Navbar 
          onChange = { this._changeSelectedMp }
        />

        { componentToRender }
      </div>
    )
  } 

  _changeSelectedMp = (mp) => {  

    this.setState({
      selectedMP: mp
    })
  }


  
}

export default App;