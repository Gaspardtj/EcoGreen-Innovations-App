import React from 'react';
import { Link } from 'react-router-dom';

const Articles = () => {
  // Mock data - replace with API call
  const articles = [
    { id: 1, title: 'Benefits of Composting', excerpt: 'Learn how composting helps the environment...', date: '2024-01-15' },
    { id: 2, title: 'Community Clean-up Success', excerpt: 'How our volunteers made a difference...', date: '2024-01-10' },
  ];

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Awareness Articles</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <div key={article.id} className="card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{article.date}</span>
              <Link to={`/articles/${article.id}`} className="text-primary-600 hover:text-primary-700">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;