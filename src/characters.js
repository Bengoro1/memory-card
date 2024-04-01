import { useState, useEffect } from "react";

function fetchList(url) {
  const [data, setData] = useState()
  
  useEffect(() => {
    let cleanUp = false;
    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (!cleanUp) setData(data)
        })
        .catch(error => console.error(error))
      
      return () => {
        cleanUp = true;
      }
    }
  }, [url])
  return data;
}


export default fetchList;