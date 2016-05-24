import React from 'react';

var MpSponsoredBill = React.createClass({


  render: function() {
    var sponsored_bills = this.props.mp.sponsored_bills
    console.log(this.props.mp.committees)
    return (
      <div>
      {this.props.mp.sponsored_bills ? 
      <div className="row-item">
        <h2>Sponsored Bill</h2>
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