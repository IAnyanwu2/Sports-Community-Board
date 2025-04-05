// import React, { useState } from 'react';

// const TeamSearch = () => {
//   const [query, setQuery] = useState('');
//   const [teams, setTeams] = useState([]);
//   const [selectedTeamId, setSelectedTeamId] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchTeamData = async () => {
//     try {
//       const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${query}`);
//       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

//       const data = await res.json();
//       console.log('Full Teams Data:', data); // Debugging the full API response

//       if (data.teams) {
//         setTeams(data.teams);
//         setError(null);
//         setSelectedTeamId(null);
//         setEvents([]);
//       } else {
//         setTeams([]);
//         setError('No teams found.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An error occurred.');
//     }
//   };

//   const fetchUpcomingEvents = async (teamId) => {
//     try {
//       const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${teamId}`);
//       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

//       const data = await res.json();
//       if (data.events) {
//         setEvents(data.events);
//       } else {
//         setEvents([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setEvents([]);
//     }
//   };

//   const handleTeamClick = (teamId) => {
//     setSelectedTeamId(teamId);
//     fetchUpcomingEvents(teamId);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) fetchTeamData();
//   };

//   // Function to get the image related to the team (fan art or images)
//   const getTeamImage = (imageUrl) => {
//     if (imageUrl) {
//       return imageUrl.includes('images/') ? imageUrl.replace('.jpg', '/small.jpg') : imageUrl;
//     }
//     return '/default-image.png'; // Fallback image if no team-related image is available
//   };

//   return (
//     <div className="team-search">
//       <h2>Search Real-Time Team Info</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter team name..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="search-bar"
//         />
//         <button type="submit">Search</button>
//       </form>

//       {error && <p className="error">{error}</p>}

//       {teams.length > 0 && (
//         <div className="team-results">
//           {teams.map((team) => {
//             const imageUrl = getTeamImage(team.strTeamFanart); // Get image URL related to the team
//             return (
//               <div
//                 key={team.idTeam}
//                 className={`team-card ${selectedTeamId === team.idTeam ? 'active' : ''}`}
//                 onClick={() => handleTeamClick(team.idTeam)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <h3>{team.strTeam}</h3>
//                 <p><strong>League:</strong> {team.strLeague}</p>
//                 <p><strong>Country:</strong> {team.strCountry}</p>
//                 {imageUrl && <img src={imageUrl} alt={team.strTeam} className="team-image" />}
//                 {team.strDescriptionEN && <p>{team.strDescriptionEN.substring(0, 150)}...</p>}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {events.length > 0 && (
//         <div className="event-results">
//           <h3>Upcoming Events</h3>
//           {events.map((event) => (
//             <div key={event.idEvent} className="event-card">
//               <p><strong>{event.strEvent}</strong></p>
//               <p>{event.dateEvent} — {event.strTime}</p>
//               {event.strVenue && <p>📍 {event.strVenue}</p>}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamSearch;