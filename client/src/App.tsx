import { useEffect } from "react";

function App() {
  async function fetchAPI(){
    const url = 'https://yt-api.p.rapidapi.com/dl?id=arj7oStGLkU';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e191d2583dmsh09f69f5b8580d12p139e60jsn9ae54cae97a7',
        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  
  return (
    <div className=""></div>
  )
}

export default App
