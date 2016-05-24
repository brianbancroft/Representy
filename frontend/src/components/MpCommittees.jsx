import React from 'react';

var MpCommittees = React.createClass({


  render: function() {
    var committees = this.props.mp.committees
    console.log(this.props.mp.committees)
    return (
      <div>
      {this.props.mp.committee_tally ? 
      <div className="row-item">
        <h2>Committees</h2>
        <ul>
          {committees.map(function(committee){
            return (
              <li>{committee}</li>
              )
          })}
          
        </ul>
      </div> : ''}

  </div>
    )
  }
});



export default MpCommittees;