import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import {Loading } from '../components/Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation(); //images, news, videos, etc...

  useEffect(() => {
    if(searchTerm) {
      if(location.pathname === '/videos') {
        getResults(`/search/q=${searchTerm} videos`);
      }else {
        getResults(`${location.pathname}/q=${searchTerm}&num=50`);
      }
    }
    
  }, [searchTerm, location.pathname]);
  if(isLoading) {
    return <Loading />;
  }
  console.log(location.pathname);

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title, description}, index) => {
            return (
              <div key={index} className="md:w-2/5 w-full">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <p className="text-sm dark:text-gray-100 hover:text-gray-200 text-gray-700">
                    {description.length > 40 ? description.substring(0,40) : description}
                  </p>
              </div>
            )
          })}
        </div>
      );
    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center ">
          {results?.map(({ image, link: { href, title } }, index) => {
            return (
              <a href={href} className="sm:p-3 p-5" key={index} target="_blank" rel="noreferrer">
                <img src={image?.src} alt={title} loading="lazy" />
                <p className="w-36 hover:underline break-words text-sm mt-2">
                  {title}
                </p>
              </a>
            )
          })}
        </div>
      );
    case '/news':
      return (
        <div className="flex flex-wrap justify-center items-center ">
          {results?.map(({ links, id, source, title }) => {
            return (
              <div key={id} className="md:w-2/5 w-full">
                <a href={links?.[0].href} className="hover:underline" target="_blank" rel="noreferrer">
                  <p className="text-lg dark:text-blue-300 text-blue-700 ">
                    {title}
                  </p>

                </a>
              </div>
            )
          })}
        </div>
      );
    case '/videos':
      return (
        <div className="flex flex-wrap">
          {results.map((video, index) => {
            return (
              <div key={index} className="p-2">
                <ReactPlayer url={video.additional_links?.[0].href} controls width="355px" height="200px"></ReactPlayer>
              </div>
            );
          })}
        </div>
      );
  
    default:
      return 'ERRORRO';
  }
}
