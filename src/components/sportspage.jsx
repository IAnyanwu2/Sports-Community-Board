import React, { useState } from 'react';
import './sportspage.css';

import soccerImage from '../assets/soccer.jpg';
import basketballImage from '../assets/basketball.jpg';
import baseballImage from '../assets/baseball.jpg';
import footballImage from '../assets/football.jpg';
import hockeyImage from '../assets/hockey.jpg';
import volleyballImage from '../assets/volleyball.jpg';
import boxingImage from '../assets/boxing.jpg';
import tennisImage from '../assets/tennis.jpg';
import rugbyImage from '../assets/rugby.jpg';
import swimmingImage from '../assets/swimming.jpg';
import runningImage from '../assets/running.jpg';
import golfImage from '../assets/golf.jpg';

const sportsList = [
    { name: "Soccer", img: soccerImage, desc: "Juego Bonito!" },
    { name: "Basketball", img: basketballImage, desc: "Hardwood Madness!" },
    { name: "Baseball", img: baseballImage, desc: "Pitching the Fun!" },
    { name: "Football", img: footballImage, desc: "Toss the pigskin!" },
    { name: "Hockey", img: hockeyImage, desc: "Ice Frenzy!" },
    { name: "Volleyball", img: volleyballImage, desc: "Mine! Mine!" },
    { name: "Boxing", img: boxingImage, desc: "KO!" },
    { name: "Tennis", img: tennisImage, desc: "Serving You!" },
    { name: "Rugby", img: rugbyImage, desc: "No Guts No Glory!" },
    { name: "Swimming", img: swimmingImage, desc: "Keep On Swimming!" },
    { name: "Track", img: runningImage, desc: "Ready Set Go!" },
    { name: "Golf", img: golfImage, desc: "Fore!" },
];
const SportPage = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredSports = sportsList.filter(sport => sport.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <div className="sport-page">
            <h2>
                Explore Your Favorite Sports!
            </h2>

            <input
                type='text'
                placeholder='Search a sport'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-bar'
            />    
            
            <div className="sports-board">
                {filteredSports.map((sport, index) => (
                    <div key={index} className="sport-card">
                        <img src={sport.img} alt={sport.name} />
                        <h3>{sport.name}</h3>
                        <p>{sport.desc}</p>
                    </div>
                ))}               
            </div>
        </div>
    )
}
export default SportPage;