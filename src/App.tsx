import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import GaragePage from './components/garage/GaragePage';
import WinnersPage from './components/winners/WinnersPage';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<GaragePage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
