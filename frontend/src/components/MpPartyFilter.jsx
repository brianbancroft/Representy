import React from 'react';
var ReactTooltip = require("react-tooltip")

var MpPartyFilter = React.createClass({
  
    _handleChange: function(event) {
    this.props.updateSearchText(event.target.value)
  },


  render: function() {

    return (
      <div className="row-container no-margin">
      <ReactTooltip/>
     
        <div className="filter all">
          <input type="radio" name="party" onChange={this._handleChange} value="" defaultChecked={true}/> 
          All
        </div>
        <div className="filter lib">
          <input type="radio" name="party" onChange={this._handleChange} value="Liberal"/> 
          <span data-tip="liberal">Liberal</span>
        </div>
        <div className="filter con">
          <input type="radio" name="party" onChange={this._handleChange} value="Conservative"/> 
          <span data-tip="conservative">Conservative</span>
        </div>
        <div className="filter ndp">
          <input type="radio" name="party" onChange={this._handleChange} value="NDP"/> 
          <span data-tip="ndp">NDP</span>
        </div>
        <div className="filter bloc">
          <input type="radio" name="party" onChange={this._handleChange} value="Bloc Québécois"/> 
          <span data-tip="bloc">Bloc Québécois</span>
        </div>
        <div className="filter green">
          <input type="radio" name="party" onChange={this._handleChange} value="Green Party"/> 
          <span data-tip="green">Green Party</span>
        </div>
      </div>
    )
  }
});



export default MpPartyFilter;