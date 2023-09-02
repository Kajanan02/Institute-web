import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>

    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
    >
        <Marker
            position={{ lat: props.location.lat, lng: props.location.lng }}
        />
    </GoogleMap>
));

export default function StudentLocationView({location}) {

    console.log(location)

    return (
        <div>
            <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        </div>
    );
}

