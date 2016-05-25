import React from 'react';

class MpLocationSearch extends React.Component {


  _selectMp(mpId) {
    this.props.onChange(mpId)
  }


 _getMp() {
  
  var lat
  var long
const self = this
  if (!navigator.geolocation) {
      geolocate.innerHTML = 'Geolocation is not available';
  } else {
    console.log('hi')
      navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          // window.location = 'http://localhost:3000/location/latitude:'+ lat +'&longitude:'+ long;
          var url =  'http://localhost:3000/location/latitude:'+ lat +'&longitude:'+ long;
          console.log(url)
          var riding = ''

          $.ajax({
            url: url,
            dataType: "json",
            async: false,
            data: riding
          }).done(function(res) {
            riding = res
          }).fail(function(res){
          })

          
          var mps = []

          $.ajax({
            url: 'http://localhost:3000/members',
            dataType: "json",
            async: false,
            data: mps
          }).done(function(res) {
            mps = res
          }).fail(function(res){
          })
          var mpId = ''
          mps.map(function (mp) { 
            if (mp.riding_id == riding.riding) { 
              mpId = mp.id            
            } 
          });

          console.log(mpId)
          self._selectMp(mpId)
          return mpId

      });
    }
    
  }

  render() {
    return (
        <div className="row-item">
          <button onClick = {this._getMp.bind(this)}><span className="icon icon-location"></span>Your Location</button>
        </div>
    )
  }
}



export default MpLocationSearch