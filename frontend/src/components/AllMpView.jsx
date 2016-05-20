import React from 'react';
import MpThumb from './MpThumb.jsx';
import MpIntro from './MpIntro.jsx';
import MpTextSearch from './MpTextSearch.jsx';


class AllMpView extends React.Component {
  state = {
    searchText: ''
  }

  render() {

    var filterData = this.props.data.filter((data) => {
      return data.name.match(this.state.searchText)
    })

    return (
      <div>
        <div className="body">
          <main className="main">
            <div className="main-body">
              <section>   
              <MpIntro /> 
              <MpTextSearch updateSearchText = { this._updateSearchText }/>
              <div id="mp-container">

                {filterData.map(function(mp){
                  return (<MpThumb key={mp.name} data={mp} onChange={ this.props.onChange } />)
                }, this)}

              </div>


              </section>
            </div>
          </main>
        </div>
      </div>
    )
  }
 
  _updateSearchText = (text) => {
    console.log(text)
    this.setState({searchText: text})
  }

}

export default AllMpView;