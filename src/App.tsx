import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { useLocalStorage } from 'usehooks-ts';
import uniqid from 'uniqid';

function App() {
  const [uid, setUid] = useLocalStorage('uid', '');

  useEffect(() => {
    if (uid) return;

    setUid(uniqid());
  }, [setUid, uid]);

  return useRoutes(routes);
}

export default App;
