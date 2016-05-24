import React from 'react';
import ReactDOM from 'react-dom';
var ReactTooltip = require("react-tooltip")

var MpStars = React.createClass({

  render: function() {

////////// score system
//---------------------------------
////////// 1-3 below average
////////// 4-7 average
////////// 8-10 above average
var tweetScore = parseFloat(this.props.mp.twitter_participation_score).toFixed(1)
  
  if (tweetScore === "NaN") {
    tweetScore = "0.0"
  }
      
      var tweetTag
        if (tweetScore < 2) {
            tweetTag = "one"
          } else if (tweetScore < 3){
            tweetTag = "two"
          } else if (tweetScore < 4){
            tweetTag = "three"
          } else if (tweetScore < 5){
            tweetTag = "four"
          } else if (tweetScore < 6){
            tweetTag = "five"
          } else if (tweetScore < 7){
            tweetTag = "six"
          } else if (tweetScore < 8){
            tweetTag = "seven"
          } else if (tweetScore < 9){
            tweetTag = "eight"
          } else if (tweetScore < 10){
            tweetTag = "nine"
          } else if (tweetScore < 11){
            tweetTag = "ten"
          }

              var tweetTip;
          if (tweetScore < 4){
            tweetTip = "BELOW AVERAGE."
          } else if (tweetScore < 8) {
            tweetTip = "AVERAGE."
          } else if (tweetScore < 11) {
            tweetTip = "ABOVE AVERAGE."
          }


    return (
      <div className="row-container">
      <ReactTooltip/>


      <div className="score">
        <span>Twitter Participation Score</span>
        <svg viewBox='0 0 100 100' className="score-circle">
        <g>
          <circle cx='50' cy='50' r='45' id={tweetTag} transform="rotate(-90 50 50)"/>
        </g>
        </svg>
        <span data-tip={"Compared to other MPs, this score is " + tweetTip} className={"score-num " + tweetTag}>{tweetScore}</span>
      </div>



      
       

      </div>

      
    )

  }

});

export default MpStars;