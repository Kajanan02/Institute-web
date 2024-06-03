import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {StandaloneSearchBox} from "@react-google-maps/api";
import {compose, withProps} from "recompose";

const MyMapComponent = compose(
    withProps({

        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `332px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap
)(props => {
        const [map, setMap] = useState(null);
        const [searchBox, setSearchBox] = useState(null);

        const onPlacesChanged = () => {
            const places = searchBox.getPlaces();
            const google = window.google;
            const bounds = new google.maps.LatLngBounds();

            // setPosition({lat:lat,lng:lng})


            places.forEach((place) => {
                console.log(place.geometry.location.lat())
                console.log(place.geometry.location.lat())

                props.markerChange({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            })
            map.fitBounds(bounds);

        };
        const onSBLoad = ref => {
            setSearchBox(ref);
        };

        return (

            <div className={'position-relative'}>
                <GoogleMap defaultZoom={8}
                           center={{lat: props.position.lat, lng: props.position.lng}}
                           ref={mapRef => {
                               setMap(mapRef);
                           }}
                           defaultCenter={{lat: props.position.lat, lng: props.position.lng}}>
                    <Marker
                        position={props.position}
                        draggable={true}
                        onDragEnd={props.onMarkerDragEnd}
                    />
                    <StandaloneSearchBox
                        onPlacesChanged={onPlacesChanged}
                        onLoad={onSBLoad}
                    >
                        <input
                            type="text"
                            placeholder="Search place"
                            style={{
                                boxSizing: 'border-box',
                                border: `1px solid transparent`,
                                width: `270px`,
                                height: `40px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.1)`,
                                fontSize: `14px`,
                                outline: `none`,
                                margin: 'center',
                                textOverflow: `ellipses`,
                                position: 'absolute',
                                bottom: '285px',
                                marginLeft: '40%'
                            }}
                        />
                    </StandaloneSearchBox>
                </GoogleMap>
            </div>
        )
    }
);

export default function StudentLocationAdd(props) {

    const [position, setPosition] = useState({lat: 6.927079, lng: 79.861244})

    useEffect(() => {
        if (!props.location) {
            return
        }
        console.log(props.location)
        setPosition(props.location)
    }, [props.location])

    function onMarkerDragEnd(coord, index) {
        console.log(coord)
        const {latLng} = coord;
        let lat = latLng.lat();
        let lng = latLng.lng();
        setPosition({lat: lat, lng: lng})
        props.onChange({lat: lat, lng: lng})
    }

    function markerChange(data) {
        setPosition(data)
        props.onChange(data)
    }

    return (
        <div>
            <MyMapComponent onMarkerDragEnd={onMarkerDragEnd} position={position} markerChange={markerChange}/>

        </div>
    );
}

