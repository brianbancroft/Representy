import React from 'react';

var SearchButton = React.createClass({
  _hello: function(event) {

    console.log('hi')
  },

    render: function() {

        return (
        <div className="row-item">
          <button onClick={this._hello}><span className="icon icon-search"></span> Search</button>
        </div>

          )
    }
});



export default SearchButton;