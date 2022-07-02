import React from 'react';
import { useQuery } from 'react-query';

export default function Blog() {
  const {
    data: joke,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery('posts', fetchPosts, {
    retry: false
  });

  function fetchPosts(){
    return fetch('https://official-joke-api.appspot.com/jokes/random').then(response => 
    response.json()
    );
  }

  return (
    <div className='container'>
        <h2>Joke APIS </h2>
        {isLoading && <div>Loading... </div>}
        {isSuccess && (
          <div>{joke.setup + ' ' + joke.punchline}</div>
        )}
         {isError && <div>{error.message} </div>}
    </div>
  )
}
