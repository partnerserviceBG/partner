import { FC, ReactNode } from 'react';
import { PlacemarkY } from '@components/common/PlacemarY/PlacemarkY.tsx';
import { House } from '@models/Rias-models/House/House.ts';
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
  house?: House;
  zoom?: number;
  height?: number;
  onPlacemarkYClick?: (house?: House) => void;
}
export const MapY: FC<MapYProps> = ({ onLoadGeoMap, height, data, house, zoom = 17, onPlacemarkYClick }): ReactNode => {
  return (
    <YMaps
      query={{
        apikey: '8d19dd16-46de-437b-8816-3e061e3a339c',
        lang: 'ru_RU',
      }}
    >
      <Map
        width='100%'
        height={height ? `${height}px` : '500px'}
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
        ) : house ? <PlacemarkY
          geometry={house.geometry}
          hintContent={`<span class='bold'>${getShortAddress(house.full_address)}</span> `}
          balloonContentHeader={null}
          balloonContent={`<span class='bold'>Адрес: </span><span class='content'>${getShortAddress(
            house.full_address
          )}`}
        /> : (
          <PlacemarkY />
        )}
      </Map>
    </YMaps>
  );
};
