import { forwardRef, ReactElement, Ref } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';



export const TransitionByNewsPanelModals = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});