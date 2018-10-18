/* eslint-disable no-undef */
import React from 'react';
import { compose, withProps, lifecycle, withState, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { JobInfoBox } from './JobInfoBox';
import 'core-js/es6/number';
import 'core-js/es6/array';

const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const _ = require("lodash"); //needs to be optimized to load only what we need
const windowHeight = window.screen.height - 100;

function getSubjectProperty(place) {
    let subject = { ZipCode: null, Latitude: null, Longitude: null };

    const zipCodePart = _.find(place.address_components, function (ac) { return ac.types[0] === 'postal_code' });
    const zipCode = zipCodePart != null ? zipCodePart.short_name : null;
    subject.ZipCode = zipCode;

    if(place.geometry && place.geometry.location && place.geometry.location.lat && place.geometry.location.lng){
      subject.Latitude = place.geometry.location.lat();
      subject.Longitude = place.geometry.location.lng();
    }

    return subject;
}

export const JobMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?client=gme-joneslanglasalle1&channel=vas&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{height: windowHeight}} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      const setSubjectProperty = this.props.setSubjectProperty;
      const applyJobFilter = this.props.applyJobFilter;

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        subjectMarkers: [],
        jobMarkers: [],
        showJobInfo: false,
        selectedJobMarker: null,
        onMapMounted: ref => {
          this.mapRef = ref;
          refs.map = ref;
        },
        onBoundsChanged: () => {
          /* issue: makes it nailed to initial location
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })*/
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          // set the subject and get jobs
          if(places != null && places.length > 0) {
              const subject = getSubjectProperty(places[0]);
              
              if(subject.ZipCode != null) {
                setSubjectProperty(subject);
                //applyJobFilter({ ZipCode: subject.ZipCode });
                applyJobFilter({ msaByZipCode: subject.ZipCode, latitude: subject.Latitude, longitude: subject.Longitude });
              } else {
                console.log("Zip code not found - it's required to determine the market.");
              }
          }

          const nextMarkers = places.map(place => ({
            position: place.geometry.location,            
            //icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            icon: {
                path: "M256,0C167.641,0,96,71.625,96,160c0,24.75,5.625,48.219,15.672,69.125C112.234,230.313,256,512,256,512l142.594-279.375   C409.719,210.844,416,186.156,416,160C416,71.625,344.375,0,256,0z M256,256c-53.016,0-96-43-96-96s42.984-96,96-96   c53,0,96,43,96,96S309,256,256,256z",
                fillColor: '#006DF0',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0,
                scale: 0.08
            }
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState(Object.assign({}, this.state,
            {
            center: nextCenter,
            subjectMarkers: nextMarkers,
            }));
           refs.map.fitBounds(bounds);
        },
        onJobClicked: (jobMarker)=> {
            this.setState(Object.assign({}, this.state, { selectedJobMarker: jobMarker, showJobInfo: true }));
        },
        onToggleJobInfo: ()=> {
            this.setState(Object.assign({}, this.state, { showJobInfo: false }));
        }
      })
    },
    componentWillReceiveProps(nextProps) {
        if(nextProps.jobs != null) {
           const bounds = new google.maps.LatLngBounds();

           const jobMarkers = nextProps.jobs.map(job => {
             let loc = { lat: job.Latitude, lng: job.Longitude };
             bounds.extend(loc);

             return {
                position: loc, 
                job: job,
                //icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                icon: {
                    path: "M256,0C167.641,0,96,71.625,96,160c0,24.75,5.625,48.219,15.672,69.125C112.234,230.313,256,512,256,512l142.594-279.375   C409.719,210.844,416,186.156,416,160C416,71.625,344.375,0,256,0z M256,256c-53.016,0-96-43-96-96s42.984-96,96-96   c53,0,96,43,96,96S309,256,256,256z",
                    fillColor: '#D80027',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0,
                    scale: 0.07
                }
            }
        });

           this.setState(Object.assign({},this.state, {jobMarkers: jobMarkers}));
           
           if(nextProps.jobs.length > 0 && this.mapRef) {
            this.mapRef.fitBounds(bounds);
           }
        }
    }
  }),
  withState('jobs', 'setJobs', []),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={10}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{
    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                  }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      dounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Find subject property..."
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `430px`,
          height: `42px`,
          marginTop: `32px`,
          marginLeft: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.showJobInfo && <InfoWindow 
        onCloseClick={props.onToggleJobInfo} 
        position={props.selectedJobMarker.position}
        pixelOffset={new google.maps.Size(0, 60)}>
            <JobInfoBox job={props.selectedJobMarker.job} />
        </InfoWindow>}
    {props.subjectMarkers.map((sub, index) =>
        <Marker 
            key={index} 
            position={sub.position}
            icon={sub.icon}
            />
    )}
    {props.jobMarkers.map((jobMarker, index) =>
        <Marker onClick={()=> props.onJobClicked(jobMarker)} 
            key={index} 
            position={jobMarker.position}
            icon={jobMarker.icon}
            />
    )}
  </GoogleMap>
)

/* Ref
            icon={{
                path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            fillColor: '#00CCBB',
            fillOpacity: 1,
            strokeColor: '',
            strokeWeight: 0
            }}

*/