import React, { useState, useEffect } from 'react';

const TeamSearch = ({ leagueName }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (leagueName) {
      fetchTeamData(leagueName);
    }
  }, [leagueName]);

  const fetchTeamData = async (leagueName) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueName}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      if (data.teams) {
        setTeams(data.teams);
        setError(null);
        setSelectedTeamId(null);
        setEvents([]);
      } else {
        setTeams([]);
        setError('No teams found for this league.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching team data.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
    fetchUpcomingEvents(teamId);
  };

  const fetchUpcomingEvents = async (teamId) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${teamId}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      if (data.events) {
        setEvents(data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="team-search">
      <h2>Search Real-Time Team Info for {leagueName}</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {teams.length > 0 && (
        <div className="team-results">
          {teams.map((team) => (
            <div
              key={team.idTeam}
              className={`team-card ${selectedTeamId === team.idTeam ? 'active' : ''}`}
              onClick={() => handleTeamClick(team.idTeam)}
            >
              <h3>{team.strTeam}</h3>
              <p><strong>League:</strong> {team.strLeague}</p>
              <p><strong>Country:</strong> {team.strCountry}</p>
              {team.strTeamFanart && <img src={team.strTeamFanart} alt={team.strTeam} />}
            </div>
          ))}
        </div>
      )}

      {events.length > 0 && (
        <div className="event-results">
          <h3>Upcoming Events</h3>
          {events.map((event) => (
            <div key={event.idEvent} className="event-card">
              <p><strong>{event.strEvent}</strong></p>
              <p>{event.dateEvent} — {event.strTime}</p>
              {event.strVenue && <p>📍 {event.strVenue}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSearch;