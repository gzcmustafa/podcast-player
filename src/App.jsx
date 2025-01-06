import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EpisodeHome from './pages/EpisodeHome';
import AudioProvider from './providers/AudioProvider';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/episode' element={<EpisodeHome />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;
