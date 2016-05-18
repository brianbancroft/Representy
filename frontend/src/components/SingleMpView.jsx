import React from 'react';
import MpHeader from './MpHeader.jsx';
import ConstituencyAddress from './ConstituencyAddress.jsx';
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
                <div className="row-container">
                  <ConstituencyAddress mp = {this.getMp()} />
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