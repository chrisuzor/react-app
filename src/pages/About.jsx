import React, { useEffect, useState } from 'react';

export default function Blog() {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    fetch('https://official-joke-api.appspot.com/jokes/random')
    .then(response => response.json())
    .then(result => {
      setIsLoading(false);
     setJoke(result.setup + ' ' + result.punchline);
    }).catch(error => {
        setIsLoading(false);
        setErrorMessage("An error occurred");
    });
  }, []);
  return (
    <div className='container'>
        <h2>Joke API </h2>
        {isLoading && <div>Loading... </div>}
        {errorMessage && <div>{errorMessage} </div>}
        {joke && (
          <div>{joke}</div>
        )}
    </div>
  )
}
