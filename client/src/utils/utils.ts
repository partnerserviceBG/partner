import { RoutesNavType } from '@utils/types.ts';

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
