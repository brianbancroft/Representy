import React from 'react';
import MpThumb from './MpThumb.jsx';
import MpIntro from './MpIntro.jsx';
import MpTextSearch from './MpTextSearch.jsx';


class AllMpView extends React.Component {
  state = {
    searchText: '',
    searchBox: false
  }

  render() {
    // var searchToRender = this.state.searchBox
    // ? <MpTextSearch updateSearchText = { this._updateSearchText }/>


    var searchToRender = <p>ahh</p>


    var filterData = this.props.data.filter((data) => {
      var text = this.state.searchText
      return data.name.toUpperCase().includes(text.toUpperCase()) || 
      data.riding.toUpperCase().includes(text.toUpperCase()) || 
      data.party.toUpperCase().includes(text.toUpperCase())
    })

    return (
      <div>
        <div className="body">
          <main className="main">
            <div className="main-body">
              <section>   
              <MpIntro selectSearchBox = { this._selectSearchBox }/> 

              {this.state.searchBox ? <MpTextSearch updateSearchText = { this._updateSearchText }/> : ''}
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

  _selectSearchBox = (event) => {
    this.setState({ searchBox: !this.state.searchBox })
  }

}

export default AllMpView;