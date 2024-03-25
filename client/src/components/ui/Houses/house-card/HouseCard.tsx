import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { House } from '@models/House.ts';
// @ts-ignore
import HouseImg from '../../../../../public/images/png/house.png';

interface HouseCardProps {
  house: House;
}
export const HouseCard: FC<HouseCardProps> = ({ house }) => {
  return (
    <Card elevation={2} sx={{ maxWidth: 200, maxHeight: 210 }}>
      <CardActionArea>
        <NavLink className='card-link' to={`${house.id}`}>
          <CardMedia sx={{ width: '25%', margin: 1 }} component='img' image={HouseImg} alt='Дом' />
          <CardContent>
            <Typography gutterBottom variant='caption' component='div'>
              {house.full_address}
            </Typography>
          </CardContent>
        </NavLink>
      </CardActionArea>
    </Card>
  );
};
