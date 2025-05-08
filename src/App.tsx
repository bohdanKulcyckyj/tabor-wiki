import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Maps from './pages/Maps';
import Dairy from './pages/Dairy';
import Encyclopedia from './pages/Encyclopedia';
import AddNewKey from './pages/AddNewKey';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/ukoly/*" element={<Tasks />} />
          <Route path="/mapy/*" element={<Maps />} />
          <Route path="/denik/*" element={<Dairy />} />
          <Route path="/encyklopedie/*" element={<Encyclopedia />} />
          <Route path="/pridat-klic" element={<AddNewKey />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
