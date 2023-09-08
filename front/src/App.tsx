import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getRoutes } from 'src/routes';
import Container from './components/Container';

const App = (): JSX.Element => {
  const routes = getRoutes();

  return (
    <Container>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {routes.map(({ id, ...other }) => (
            <Route key={id} {...other} />
          ))}
        </Routes>
      </Suspense>
    </Container>
  );
};

export default App;
