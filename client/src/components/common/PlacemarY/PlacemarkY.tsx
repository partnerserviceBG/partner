import React from 'react';
import { Placemark } from 'react-yandex-maps';

export interface PlacemarkYProps {
  geometry?: number[];
  hintContent?: string;
  balloonContentHeader?: string | null;
  balloonContent?: string;
}

const defaultHintContent = 'УК "Партнёр сервис"';

const defaultBalloonContentHeader = 'УК "Партнёр сервис"';

const defaultBalloonContent = `<span class='bold'>Адрес: </span><span class='content'>ул.Ленина д.101</span>
</br><span class='bold'>Часы работы: </span><span class='content'>Понедельник-Пятница: с 07:00 до 16:00</span>
</br><span class='bold'>Перерыв: </span><span class='content'>11:00 - 12:00</span>
</br><span class='bold'>Выходной: </span><span class='content'>Суббота - Воскресенье</span> 
`;

export const PlacemarkY: React.FC<PlacemarkYProps> = ({
  geometry = [56.101303, 43.501151],
  hintContent = defaultHintContent,
  balloonContentHeader = defaultBalloonContentHeader,
  balloonContent = defaultBalloonContent,
}) => {
  return (
    <Placemark
      geometry={geometry}
      properties={{
        hintContent,
        balloonContentHeader,
        balloonContent,
      }}
      modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
      options={{
        iconLayout: 'default#image',
        iconImageHref: 'src/assets/png/marker.png',
        iconImageSize: [32, 32],
        preset: 'islands#blackStretchyIcon',
      }}
    />
  );
};
