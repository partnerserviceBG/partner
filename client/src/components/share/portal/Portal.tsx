import { ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({
  children,
  container,
}: {
  children: ReactNode;
  container: Element | DocumentFragment;
}): ReactPortal | null => {
  return createPortal(children, container);
};
