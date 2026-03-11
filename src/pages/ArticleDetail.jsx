import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="container-custom py-16">
      <Link to="/articles" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
        ← Back to Articles
      </Link>
      <article className="card">
        <h1 className="text-3xl font-bold mb-4">Article Title {id}</h1>
        <div className="prose max-w-none">
          <p>Article content goes here...</p>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;