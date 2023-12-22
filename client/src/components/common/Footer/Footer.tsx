import React from 'react';
import { Container, Divider } from '@components/common';

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <div className='footer-wrapper'></div>
      </Container>
      <Divider variant='fullWidth' className='footer-divider' />
      <Container>
        <div className='footer-bottom'></div>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
