import React from 'react';

class MpIntro extends React.Component {
  render() {
    return (
      <div>
      <div className="row-container-center">
        <h1>FIND YOUR MP</h1>
      </div>
      <div className="row-container">
        <div className="row-item"><button>Your Location</button></div>
        <div className="row-item"><button>Map</button></div>
        <div className="row-item"><button>Search</button></div>
      </div>
      </div>
    )
  }
  
}

export default MpIntro;