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

    const componentToRender = this.state.selectedMP
    ? <SingleMpView
        mp = {this.state.selectedMP}
        data = {this.props.data}
      /> 
    : <AllMpView 
        data = { this.props.data }
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