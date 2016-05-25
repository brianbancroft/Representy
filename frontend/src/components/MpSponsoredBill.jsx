import React from 'react';
var ReactTooltip = require("react-tooltip")

var MpSponsoredBill = React.createClass({


  render: function() {
    var sponsored_bills = this.props.mp.sponsored_bills
    console.log(this.props.mp.committees)
    return (
      <div>
      <ReactTooltip data-multiline='true'/>

      {(this.props.mp.sponsored_bills) ?

      <div className="row-item">
        <h2>Sponsored Bills <span data-multiline='true' data-tip="Bills introduced by this MP." className="icon icon-help-circled"></span> </h2>
          <div className='spons-bill'>
          {sponsored_bills.map(function(bill){
            return (
              <span className="line">{bill}<br/></span>
              )

          })}
          </div>
        
      </div> : ''}

  </div>
    )
  }
});



export default MpSponsoredBill;