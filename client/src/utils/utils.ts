import { RoutesNavType } from '@utils/types.ts';
import { House } from '@models/Rias-models/House/House.ts';
import * as _ from 'lodash';

export const getShortAddress = (fullAddress?: string) => {
  return fullAddress?.split(',').slice(2).join(',');
};

export const getAllChildren = (row: RoutesNavType[]): RoutesNavType[] => {
  let children: RoutesNavType[] = [];
  const flattenChildren = row.map((child) => {
    if (child.children && child.children.length) {
      children = [...children, ...child.children];
    }
    return child;
  });
  return flattenChildren.concat(children.length ? getAllChildren(children) : children);
};

export const groupByHouses = (data: House[] | undefined): { [p: string]: Partial<House> }[] => {
  const newData = _.cloneDeep(data)?.map((el: House) => ({
    ...el,
    full_address: getShortAddress(el.full_address),
    city: getShortAddress(el.full_address)?.split(',')[0],
    street: getShortAddress(el.full_address)?.split(',')[1],
    houseNumber: getShortAddress(el.full_address)?.split(',')[2],
  }));
  return Object.entries(_.groupBy(newData, 'city')).map(([key, value]) => {
    return { [key]: _.groupBy(value, 'street') };
  })
}