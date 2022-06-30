import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function Blog() {

  const {data: posts, isLoading, errorMessage} = useFetch('https://www.reddit.com/r/aww.json');
  return (
    <div className='container'>
        <h2>Reddit API </h2>
        {isLoading && <div>Loading... </div>}
        {errorMessage && <div>{errorMessage} </div>}
        {posts && (
          <ul>
            {posts.data.children.map(post => (
              <li key={post.data.id}>
                <a href={`https://reddit.com${post.data.permalink}`}>{post.data.title}</a>
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}
