import '../../index.css';
import { routesConfig } from '../../services/routes';
import styles from './app.module.css';

import { AppHeader, ProtectedRoute } from '@components';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      {routesConfig.map(({ path, element, isProtected }) =>
        isProtected ? (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ) : (
          <Route key={path} path={path} element={element} />
        )
      )}
    </Routes>
  </div>
);

export default App;
