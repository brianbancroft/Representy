import React from 'react';

var MpPartyFilter = React.createClass({
  
    _handleChange: function(event) {
    this.props.updateSearchText(event.target.value)
  },


  render: function() {

    return (
      <div className="row-container no-margin">
        <div className="filter all"><input type="radio" name="party" onChange={this._handleChange} value="" defaultChecked={true}/> All</div>
        <div className="filter lib"><input type="radio" name="party" onChange={this._handleChange} value="Liberal"/> Liberal</div>
        <div className="filter con"><input type="radio" name="party" onChange={this._handleChange} value="Conservative"/> Conservative</div>
        <div className="filter ndp"><input type="radio" name="party" onChange={this._handleChange} value="NDP"/> NDP</div>
        <div className="filter bloc"><input type="radio" name="party" onChange={this._handleChange} value="Bloc Québécois"/> Bloc Québécois</div>
        <div className="filter green"><input type="radio" name="party" onChange={this._handleChange} value="Green Party"/> Green Party</div>
      </div>
    )
  }
});



export default MpPartyFilter;