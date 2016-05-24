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
      <div>
      <div className="row-container">
      <ReactTooltip/>



      
       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='one' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is BELOW AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#EA222D" > 1.6 </text>
         </g>
         </svg>
       </div>       

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='two' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is BELOW AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#DB2D2C" > 2.3 </text>
         </g>
         </svg>
       </div>   

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='three' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is BELOW AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#CA382B" > 3.4 </text>
         </g>
         </svg>
       </div>   

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='four' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#B9462A" > 4.2 </text>
         </g>
         </svg>
       </div> 

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='five' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#A75429" > 5.8 </text>
         </g>
         </svg>
       </div> 



      </div>

      <div className="row-container">
      <ReactTooltip/>
 

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='six' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is AVERAGE" x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#995F29" > 6.3 </text>
         </g>
         </svg>
       </div> 

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='seven' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#837029" > 7.0 </text>
         </g>
         </svg>
       </div> 

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='eight' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is ABOVE AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#737E29" > 8.3 </text>
         </g>
         </svg>
       </div> 


       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='nine' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is ABOVE AVERAGE"  x="25" y="65" fontFamily="Helvetica" fontSize="35" fill="#648A2A" > 9.5 </text>
         </g>
         </svg>
       </div> 

       <div className="score">
         <span>test score svgs</span>
         <svg viewBox='0 0 100 100'>
         <g>
           <circle cx='50' cy='50' r='45' id='ten' transform="rotate(-90 50 50)"/>
           <text data-tip= "Compared to other MPs, this score is ABOVE AVERAGE"  x="15" y="65" fontFamily="Helvetica" fontSize="35" fill="#53992B" > 10.5 </text>
         </g>
         </svg>
       </div> 

      </div>
      </div>
    )

  }

});

export default MpStars;