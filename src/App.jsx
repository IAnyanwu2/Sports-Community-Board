import { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SportPage from './components/sportspage';
import TeamSearch from './components/searchteam';
import NewsSearch from './components/searchnews';

const AppRoutes = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [leagueName, setLeagueName] = useState(null);
  const navigate = useNavigate();

  const sportsLeagues = {
    Soccer: 'English Premier League',
    Basketball: 'NBA',
    Baseball: 'MLB',
    Football: 'NFL',
    Hockey: 'NHL',
    Volleyball: 'AVP',
    Boxing: 'WBC',
    Tennis: 'ATP',
    Rugby: 'Super Rugby',
    Swimming: 'FINA',
    Track: 'IAAF',
    Golf: 'PGA Tour',
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
    const league = sportsLeagues[sport] || null;
    setLeagueName(league);
    navigate('/teams'); // Navigate to teams view
  };

  return (
    <Routes>
      <Route path="/" element={<SportPage onSportClick={handleSportClick} />} />
      <Route
        path="/teams"
        element={<TeamSearch leagueName={leagueName} />} // ✅ Clean prop name
      />
      <Route
        path="/news"
        element={<NewsSearch selectedSport={selectedSport} />}
      />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;