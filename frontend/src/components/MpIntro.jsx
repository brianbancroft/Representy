import React from 'react';
import SearchButton from './SearchButton.jsx';
import MapButton from './MapButton.jsx';

class MpIntro extends React.Component {


  render() {

    return (
      <div>
      <div className="column-container-center">
      
        <h1>GET YOUR MP</h1>

      </div>

      <div className="row-container">
        <div className="row-item">
          <button><span className="icon icon-location"></span> Your Location</button>
        </div>
        <MapButton onClick = {this.props.selectMapBox}/>
        <SearchButton onClick = {this.props.selectSearchBox} />
      </div>
      </div>
    )
  }

}

export default MpIntro;