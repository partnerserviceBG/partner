import { Footer, Header } from '@components/common';
import { Outlet } from 'react-router-dom';

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
