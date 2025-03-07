import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoPage from './Pages/VideoPage';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Main from './Pages/Main';
import TurfDetails from './Pages/TurfDetails';
import ProfilePage from './Pages/ProfilePage';
import AboutPage from './Pages/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/turf/:id" element={<TurfDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
