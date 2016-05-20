import React from 'react';
import SearchButton from './SearchButton.jsx';

class MpIntro extends React.Component {
  render() {
    return (
      <div>
      <div className="row-container-center">
        <h1>FIND YOUR MP</h1>
      </div>
      <div className="row-container">
        <div className="row-item">
          <button><span className="icon icon-location"></span> Your Location</button>
        </div>
        <div className="row-item">
          <button><span className="icon icon-globe"></span> Map</button>
        </div>
        <SearchButton/>
      </div>
      </div>
    )
  }
}

export default MpIntro;