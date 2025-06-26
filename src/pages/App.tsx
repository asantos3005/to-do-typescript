import { BrowserRouter, Routes, } from 'react-router-dom';
import Layout from '../components/layout';
//import Home from './pages/Home';
//import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            {/* 
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
            */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
