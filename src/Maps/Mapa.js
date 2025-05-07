import { Map } from '@vis.gl/react-maplibre';
import { middleOfPortugal } from '../lib/constants';
import YouAreHere from '../components/you-are-here';
import React from 'react';

function MapaTemplate() {
    return (
      <Map
        initialViewState={{
          longitude: middleOfPortugal[0],
          latitude: middleOfPortugal[1],
          zoom: 4
        }}
        //mapStyle="/styles/dark.json"
        style={{width: 600, height: 600}}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        <YouAreHere />
      </Map>
    );
  }