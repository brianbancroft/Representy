import React from 'react';

class Navbar extends React.Component {


  render() {
    return (
      <header className="navbar-mp" >
        <div className="skew">
            <div className="width">
              <div className="logo" 
                onClick={ () => this.props.onChange() } 
              >
                <span className="light">MY</span><span className="bold">MP</span>
              </div>
            </div>
        </div>
      </header>
    )
  }  
}

export default Navbar;