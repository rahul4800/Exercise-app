
export const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      
    }
  };

  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2fe09fcb13msh6e633d4c38833e7p10fd0djsnc70a2eb6e6e2' ,
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

export const fetchData = async(url, options) =>{
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
};