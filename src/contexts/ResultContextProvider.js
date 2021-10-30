import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseURL = `https://google-search3.p.rapidapi.com/api/v1`;

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('AOMG');

  // /videos, /search, /image
  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseURL}${type}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': '77945ecbeemsh6a7376b7c6e9d3bp18c6c1jsn23b8e16174e3',
      },
    });

    const data = await response.json();

    if(type.includes('/search')) {
      setResults(data.results);
    } else if(type.includes('/images')) {
      setResults(data.image_results);
    } else if(type.includes('/news')) {
      setResults(data.entries);
    }

    console.log(data);

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
