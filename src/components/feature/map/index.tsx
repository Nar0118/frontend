import GoogleMapReact from 'google-map-react';
import { Tooltip } from 'antd';
import { IAnyReactComponent, LocationType } from './types';

import styles from './map.module.scss';

// this is details for 28 Vardanants St, Yerevan 0070 address
export const location: LocationType = {
    lat: 40.170313,
    lng: 44.5215781,
};

const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_API_KEY;
const address: string | undefined = process.env.REACT_APP_ADDRESS;

const Map = () =>
    <div className={styles.map}>
        {apiKey && <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={location}
            defaultZoom={15}
        >
            <AnyReactComponent
                lat={location.lat}
                lng={location.lng}
                text={address}
            />
        </GoogleMapReact>}
    </div>

const AnyReactComponent = ({ text }: IAnyReactComponent) => (
    <div className={styles.anyReactComponent}>
        <Tooltip placement="top" title={text}>
            <img src="/gif/location.gif" alt="location" className={styles.location} />
        </Tooltip>
    </div>
);

export default Map;
