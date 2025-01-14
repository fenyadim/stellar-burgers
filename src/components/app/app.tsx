import { useEffect } from 'react';
import '../../index.css';
import { routesConfig } from '../../services/routes';
import styles from './app.module.css';

import { AppHeader, Modal, OnlyAuth } from '@components';

import {
  checkUserAuth,
  getFeedsThunk,
  getIngredientsThunk,
  getOrdersThunk
} from '@slices';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getFeedsThunk());
    dispatch(getIngredientsThunk());
    dispatch(getOrdersThunk());
  }, []);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {routesConfig.map(({ path, element, isProtected }) =>
          isProtected ? (
            <Route
              key={path}
              path={path}
              element={<OnlyAuth>{element}</OnlyAuth>}
            />
          ) : (
            <Route key={path} path={path} element={element} />
          )
        )}
      </Routes>

      {backgroundLocation && (
        <Routes>
          {routesConfig.map(
            ({ path, titleModal, element }) =>
              titleModal && (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Modal title={titleModal} onClose={onCloseModal}>
                      {element}
                    </Modal>
                  }
                />
              )
          )}
        </Routes>
      )}
    </div>
  );
};

export default App;
