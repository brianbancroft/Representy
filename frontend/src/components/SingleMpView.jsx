import React from 'react';
import MpHeader from './MpHeader.jsx';
import MpStats from './MpStats.jsx';
import MpNews from './MpNews.jsx';

import ConstituencyAddress from './ConstituencyAddress.jsx';
import SingleRidingMap from './SingleRidingMap.jsx';

import MpFooter from './MpFooter.jsx';


class SingleMpView extends React.Component {


getMp() {
  for (var index in this.props.data){
    if (this.props.data[index].id == this.props.mp)
      return this.props.data[index]
  }
  return null
}

  


  render() {



    return (
      <div>
        <div className="body">
          <main className="main">
            <div className="main-body">
              <section>
               <MpHeader mp = {this.getMp()} />
               <MpStats/>
               <div className="row-container">
                <MpNews mp = {this.getMp()} />

               </div>

                <div className="row-container">
                <SingleRidingMap mp = {this.getMp()} />
                  
                  <ConstituencyAddress mp = {this.getMp()} />
                  <div className="row-item">another row item</div>

                </div>
              </section>
            </div>
          </main>
        </div>
        <MpFooter mp = {this.getMp()} />   
      </div>
    )
  }
  
}

export default SingleMpView;