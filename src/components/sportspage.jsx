import React, { useState, useEffect } from 'react';
import './sportspage.css';
import NewsChart from './newschart';

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


const SportPage = ({ onSportClick }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSport, setSelectedSport] = useState(null);
    const [articleData, setArticleData] = useState([]);
    const [chartData, setChartData] = useState([]);  // Store chart data

    const API_KEY = "5443f1c2ba3dd6c8ecf68c8398cd2d4f";

    const filteredSports = sportsList.filter(sport =>
        sport.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch news and format chart data
    const fetchNews = async (sportName) => {
        try {
            const response = await fetch(
                `https://gnews.io/api/v4/search?q=${sportName}&lang=en&country=us&max=10&apikey=${API_KEY}`
            );
            const data = await response.json();
            console.log("Fetched Articles:", data);

            const articleList = data.articles;

            // Format articles for displaying in the news section
            const formattedArticles = articleList.map((article) => ({
                title: article.title,
                description: article.description,
                image: article.image,
                url: article.url,
                date: new Date(article.publishedAt).toLocaleDateString(),
            }));

            // Prepare data for the chart (count of articles per date)
            const dateCounts = formattedArticles.reduce((acc, article) => {
                acc[article.date] = (acc[article.date] || 0) + 1;
                return acc;
            }, {});

            const formattedChartData = Object.entries(dateCounts).map(([date, count]) => ({
                date,
                count,
            }));

            // Set both articles and chart data
            setArticleData(formattedArticles);
            setChartData(formattedChartData);

        } catch (error) {
            console.error("Failed to fetch news", error);
            setArticleData([]);
            setChartData([]);
        }
    };

    const handleSportClick = (sportName) => {
        console.log("Clicked:", sportName);
        setSelectedSport(sportName);
        fetchNews(sportName);
        onSportClick && onSportClick(sportName);
    };

    return (
        <div className="sport-page">
            <h2>Explore Your Favorite Sports!</h2>

            <input
                type="text"
                placeholder="Search a sport"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <div className="sports-board">
                {filteredSports.map((sport, index) => (
                    <div
                        key={index}
                        className="sport-card"
                        onClick={() => handleSportClick(sport.name)}
                    >
                        <img src={sport.img} alt={sport.name} />
                        <h3>{sport.name}</h3>
                        <p>{sport.desc}</p>
                    </div>
                ))}
            </div>

            {/* Show the news section if articleData is available */}
            {articleData.length > 0 && (
                <div className="news-section">
                    <h3>{selectedSport} - Latest News</h3>
                    <div className="news-list">
                        {articleData.map((article, index) => (
                            <div key={index} className="news-item">
                                <h4>{article.title}</h4>
                                <img src={article.image} alt={article.title} />
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read more
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* If there are articles, display the chart */}
            {chartData.length > 0 && (
                <div className="chart-section">
                    <h3>{selectedSport} - News Activity</h3>
                    <NewsChart data={chartData} />
                </div>
            )}
        </div>
    );
};

export default SportPage;
