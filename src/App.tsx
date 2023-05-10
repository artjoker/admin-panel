import { Suspense } from 'react';
import 'antd/dist/reset.css';

import { Router } from './Router/Router';

const App = () => {
  return (
    <Suspense fallback={false}>
      <Router />
    </Suspense>
  );
};

export default App;
