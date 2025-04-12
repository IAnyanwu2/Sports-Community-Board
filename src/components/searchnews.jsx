import React, { useState, useEffect } from 'react';

const NewsSearch = ({ selectedSport }) => {
  const [term, setTerm] = useState(selectedSport || ''); // Initialize search term with selected sport
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [loading, setLoading] = useState(false);

  const API_KEY = '5443f1c2ba3dd6c8ecf68c8398cd2d4f';

  // Fetch news articles based on term (search query)
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(term)}&lang=en&max=10&apikey=${API_KEY}`
      );
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      console.log('News data:', data); // Debugging the response

      if (data.articles) {
        setArticles(data.articles);
        setError(null);
        setLoading(false);
      } else {
        setArticles([]);
        setError('No news articles found.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching news.');
      setLoading(false);
    }
  };

  // Handle search term change
  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      fetchNews();
    }
  };

  // Apply filters based on category and date range
  useEffect(() => {
    let filtered = [...articles];

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((article) =>
        article.source.name.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (dateRange !== 'All') {
      const dateThreshold = new Date();
      if (dateRange === 'Last 24 hours') {
        dateThreshold.setDate(dateThreshold.getDate() - 1);
      } else if (dateRange === 'Last Week') {
        dateThreshold.setDate(dateThreshold.getDate() - 7);
      }

      filtered = filtered.filter(
        (article) => new Date(article.publishedAt) >= dateThreshold
      );
    }

    setFilteredArticles(filtered);
  }, [articles, categoryFilter, dateRange]);

  useEffect(() => {
    if (selectedSport) {
      setTerm(selectedSport); // Update search term when selectedSport changes
      fetchNews();  // Fetch news related to the selected sport
    }
  }, [selectedSport]);

  return (
    <div className="news-search">
      <h2>🔍 Search Sports News</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Arsenal, NBA, Messi..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="search-bar"
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Filter UI */}
      <div className="filters">
        <label>
          Category:
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </label>

        <label>
          Date Range:
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Last 24 hours">Last 24 hours</option>
            <option value="Last Week">Last Week</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading...</p>}

      {filteredArticles.length > 0 && (
        <div className="news-results">
          <h3>Latest News</h3>
          {filteredArticles.map((article, index) => {
            console.log('Article Image URL:', article.image); // Debugging image URL
            return (
              <div key={index} className="news-article">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="news-image"
                  />
                )}
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h4>{article.title}</h4>
                </a>
                <p>{article.description}</p>
                <p>
                  <small>{new Date(article.publishedAt).toLocaleString()}</small>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewsSearch;