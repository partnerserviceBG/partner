import { BreadCrumbs, Footer, Header } from '@components/common';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

export const PagesLayout = () => {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <main className='middle'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};
