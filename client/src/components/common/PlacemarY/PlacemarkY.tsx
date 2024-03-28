import React, { useState } from 'react';
import './styles/_placemark.scss';
import { Placemark } from '@pbe/react-yandex-maps';
import { styled, useTheme } from '@mui/material';
import { House } from '@models/House.ts';
import { NavLink } from 'react-router-dom';
import { Portal } from '@components/share/portal/Portal.tsx';

export interface PlacemarkYProps {
  geometry?: number[];
  hintContent?: string;
  balloonContentHeader?: string | null;
  balloonContent?: string;
  element?: House;
}

const NavItem = styled(NavLink)(({ theme }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontWeight: 'bold',
    '&:hover': {
      opacity: 0.7,
      textDecoration: 'none',
    },
  };
});

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
  element,
}) => {
  const theme = useTheme();
  const [activePortal, setActivePortal] = useState(false);
  return (
    <>
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
          iconImageHref: './images/png/marker.png',
          iconImageSize: [32, 32],
          iconColor: theme.palette.primary.main,
          preset: 'islands#blackStretchyIcon',
        }}
        onClick={() => {
          setTimeout(() => {
            setActivePortal(true);
          }, 0);
        }}
      />
      {activePortal && (
        <Portal elementId={'house-link'}>
          <NavItem to={`${element?.id}`}>{'Подробнее'}</NavItem>
        </Portal>
      )}
    </>
  );
};
