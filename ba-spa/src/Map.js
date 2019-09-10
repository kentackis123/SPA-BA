import React from 'react';
import GoogleMapReact from 'google-map-react';
import { MapWrap, MarkerName } from './styled';

const Map = ({ lat, lng, name }) => (
    <MapWrap>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: 'AIzaSyAnCTNrWFSWu5vTUZ5GXwfVB1gNNIlOCpE'
            }}
            yesIWantToUseGoogleMapApiInternals
            center={{ lat, lng }}
            zoom={10}
        >
            <MarkerName lat={lat} lng={lng} text="My Marker">
                {name}
            </MarkerName>
        </GoogleMapReact>
    </MapWrap>
);

export default Map;
