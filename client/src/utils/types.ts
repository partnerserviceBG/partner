import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type RoutesNavType = {
  path: string;
  name: string;
  hiddenRoute?: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  parent?: RoutesNavType;
  children?: RoutesNavType[];
};

export type SignInDataType = {
  email: string;
  password: string;
};
