import Layout from './components/shared/layout';
import Home from './components/pages/home';
import MyFlights from './components/pages/my-flights';
import NotFound from './components/pages/not-found';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/my-flights',
        element: <MyFlights />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
