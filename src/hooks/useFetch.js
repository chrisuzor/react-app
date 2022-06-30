import { useEffect, useState } from 'react'

function useFetch(url) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(result => {
      setIsLoading(false);
     setData(result);
    }).catch(error => {
        setIsLoading(false);
        setErrorMessage("An error occurred");
    });
  }, [url]);
  return {data, isLoading, errorMessage}
}

export default useFetch
