import React from 'react';
import MpThumb from './MpThumb.jsx';
import MpIntro from './MpIntro.jsx';


class AllMpView extends React.Component {
  
  render() {
    return (
      <div>
        <div className="body">
          <main className="main">
            <div className="main-body">
              <section>   
              <MpIntro /> 
              <div id="mp-container">

                {this.props.data.map(function(mp){
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
  
}

export default AllMpView;