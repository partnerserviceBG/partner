import { BreadCrumbs, Footer, Header } from '@components/common';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export const PagesLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box>
        <Header />
      </Box>
      <BreadCrumbs />
      <main>
        <Outlet />
      </main>
      <Box mt='auto'>
        <Footer />
      </Box>
    </Box>
  );
};
