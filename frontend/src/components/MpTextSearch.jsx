import React from 'react';

var MpTextSearch = React.createClass({

  render: function() {
    
    return (
      <form>
        <input type = "text" placeholder = "search by name, riding, or party" />
        <button>Search</button>
      </form>
    )

  }

});

export default MpTextSearch;