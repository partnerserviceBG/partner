import { FC, ReactNode } from 'react';
import { PlacemarkY } from '@components/common/PlacemarY/PlacemarkY.tsx';
import { House } from '@models/House.ts';
import { getShortAddress } from '@utils/utils.ts';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import {
  FullscreenControl,
  GeolocationControl,
  TrafficControl,
  TypeSelector,
  YMaps,
  ZoomControl,
  Map,
} from '@pbe/react-yandex-maps';

export interface MapYProps {
  onLoadGeoMap?: (ymaps: YMapsApi) => void;
  data?: House[];
  zoom?: number;
  onPlacemarkYClick?: (house?: House) => void;
}
export const MapY: FC<MapYProps> = ({ onLoadGeoMap, data, zoom = 17, onPlacemarkYClick }): ReactNode => {
  return (
    <YMaps
      query={{
        apikey: '8d19dd16-46de-437b-8816-3e061e3a339c',
        lang: 'ru_RU',
      }}
    >
      <Map
        width='100%'
        height='500px'
        defaultState={{
          center: [56.101303, 43.501151],
          zoom,
        }}
        instanceRef={(ref) => {
          // @ts-ignore
          ref && ref.behaviors.disable('scrollZoom');
        }}
        modules={['geocode']}
        onLoad={onLoadGeoMap}
      >
        <ZoomControl options={{ position: { top: 108, left: 10 } }} />
        <FullscreenControl />
        <GeolocationControl
          options={{
            position: { top: 10, left: 10 },
          }}
        />
        <TrafficControl
          options={{
            // @ts-ignore
            float: 'right',
          }}
        />
        <TypeSelector
          options={{
            // @ts-ignore
            float: 'right',
          }}
        />
        {data ? (
          data.map((el) => (
            <PlacemarkY
              key={el.id}
              geometry={el.geometry}
              hintContent={`<span class='bold'>${getShortAddress(el.full_address)}</span> `}
              balloonContentHeader={null}
              balloonContent={`<span class='bold'>Адрес: </span><span class='content'>${getShortAddress(
                el.full_address
              )}</span></br><span id='house-link'></span>`}
              element={el}
              onPlacemarkYClick={onPlacemarkYClick}
            />
          ))
        ) : (
          <PlacemarkY />
        )}
      </Map>
    </YMaps>
  );
};
