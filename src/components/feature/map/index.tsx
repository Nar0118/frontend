import GoogleMapReact from 'google-map-react';
import { Tooltip } from 'antd';

// this is details for 28 Vardanants St, Yerevan 0070 address
const location: any = {
    lat: 40.170313,
    lng: 44.5215781,
};

const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_API_KEY;
const address: string | undefined = process.env.REACT_APP_ADDRESS;

const Map = () => {

    return (
        <div style={{ height: '400px', width: '100%' }}>
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
    );

};

const AnyReactComponent = ({ text }: any) => (
    <div style={{ fontSize: '16px', color: 'red' }}>
        <Tooltip placement="top" title={text}>
            <img src="/gif/location.gif" alt="" style={{
                width: "40px"
            }} />
        </Tooltip>
    </div>
);

export default Map;
