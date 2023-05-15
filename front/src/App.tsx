import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getRoutes } from 'src/routes';

const App = (): JSX.Element => {
  const routes = getRoutes();

  return (
    <div className="container w-3/4 m-auto mt-6">
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {routes.map(({ id, ...other }) => (
            <Route key={id} {...other} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
