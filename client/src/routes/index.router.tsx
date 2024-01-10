import { createBrowserRouter } from 'react-router-dom';
import { publicRoute } from '@routes/public.route.tsx';
import { privateRoute } from '@routes/private.route.tsx';

const router = createBrowserRouter([...publicRoute, ...privateRoute]);

export default router;
