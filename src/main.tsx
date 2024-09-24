import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from '../store.ts';
import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/main.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>,
);
