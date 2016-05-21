import React from 'react';
var ReactTooltip = require("react-tooltip")

var MpStars = React.createClass({

  render: function() {

////////// score system
//---------------------------------
////////// 1-3 below average
////////// 4-7 average
////////// 8-10 above average

    return (
      <div className="row-container">
      <ReactTooltip/>

        <div className="score">
          <span>Attendance Score</span>
          <span className="score-num one" data-tip="This score is below average">1</span>
        </div>

        <div className="score">
          <span>Attendance Score</span>
          <span className="score-num three" data-tip="This score is below average">3</span>
        </div>

        <div className="score">
          <span>Attendance Score</span>
          <span className="score-num six" data-tip="This score is average">6</span>
        </div>

        <div className="score">
          <span>Attendance Score</span>
          <span className="score-num ten" data-tip="This score is above average">10</span>
        </div>


      </div>
    )

  }

});

export default MpStars;