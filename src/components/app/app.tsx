import { useEffect } from 'react';
import '../../index.css';
import { routesConfig } from '../../services/routes';
import styles from './app.module.css';

import { AppHeader, Modal, OnlyAuth } from '@components';
import { checkUserAuth, getIngredientsThunk } from '@services/slices';
import { useDispatch } from '@services/store';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredientsThunk());
  }, []);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {routesConfig.map(({ path, element, isProtected, titleModal }) =>
          isProtected ? (
            <Route
              key={path}
              path={path}
              element={<OnlyAuth>{element}</OnlyAuth>}
            />
          ) : titleModal ? (
            <Route
              key={path}
              path={path}
              element={
                <Modal title={titleModal} onClose={onCloseModal}>
                  {element}
                </Modal>
              }
            />
          ) : (
            <Route key={path} path={path} element={element} />
          )
        )}
      </Routes>
    </div>
  );
};

export default App;
