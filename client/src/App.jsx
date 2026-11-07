import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Suspense fallback={<div role="status" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#ff6900', background: '#000' }}>Loading course details...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
