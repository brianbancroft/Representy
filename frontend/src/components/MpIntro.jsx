import React from 'react';
import SearchButton from './SearchButton.jsx';
import MapButton from './MapButton.jsx';

class MpIntro extends React.Component {


  render() {

    return (
      <div>
      <div className="column-container-center">
      
        <h1>FIND YOUR MP</h1>
        <p>Sed lobortis <span className="underline">lacus in turpis</span> luctus, vitae finibus enim tincidunt. <span className="underline">Nulla facilisi</span>. Proin vel suscipit tortor. Suspendisse potenti. Duis scelerisque urna nisi, nec <span className="underline">sagittis sem</span> aliquam ut. Donec mollis ornare pretium. In hac habitasse platea dictumst.</p>

      </div>

      <div className="row-container">
        <div className="row-item">
          <button><span className="icon icon-location"></span> Your Location</button>
        </div>
        <MapButton onClick = {this.props.selectMapBox}/>
        <SearchButton onClick = {this.props.selectSearchBox} />
      </div>
      </div>
    )
  }

}

export default MpIntro;