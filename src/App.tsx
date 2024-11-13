import { Suspense } from 'react';
import Header from './components/Header/Header';
import MapComponent from './components/Map/Map';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="grid">
      <Header />
      <main id="section-example">
        <Suspense fallback={<div>Page is Loading...</div>}>
          <MapComponent />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
