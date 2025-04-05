import { useState } from 'react'
import SportsPage from './components/sportspage'
// import TeamSearch from './components/searchteam'
import NewsSearch from './components/searchnews'
import './components/sportspage.css'
import './App.css'



function App() {

  const [darkMode, setDarkMode] = useState(false);
  
  const sportsIcons = ['🏈', '⚽', '🏀', '🏒', '🎾','🥊','🏃🏼','🏐','🏊🏼‍♂️','⚾','🏉'];

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      
      {/* <button className='toggle-dark' onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode': '🌙 Dark Mode'}
      </button> */}

      <h1>
        Welcome all Sports Fans!!
        <span role ='img' aria-label='cheer'>📣</span>
      </h1>

      <div className='banner'>
        <h2>
          
          {sportsIcons.map((icon, index) => (
            
            <span key={index} role='img' aria-label={`sports-icon-${index}`}>
              {icon}
            </span>
          ))}

        </h2>
      </div>
      
      
      
      

      <SportsPage/>
      {/* <TeamSearch/> */}
      <NewsSearch/>

    
    </div>

  )
  

}

export default App
