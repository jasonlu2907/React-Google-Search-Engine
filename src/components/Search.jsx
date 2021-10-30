import React, {useState, useEffect} from 'react'
import { useDebounce } from 'use-debounce';

// eachtime the user types each letter inside a input field
// the browser will call a new request such as (change) event in Angular
// we don't want that, so debounce sets a limit time (300ms) if the user
// keeps typing within that time, it won't make any request until they finish
// their typing.
import  {Links } from '../components/Links';
import {useResultContext} from '../contexts/ResultContextProvider';

export const Search = () => {
  const [text, setText] = useState('AOMG');
  const { setSearchTerm } = useResultContext();
  const [debounceValue] = useDebounce(text, 300);
  
  useEffect(() => {
    if(debounceValue) {
      setSearchTerm(debounceValue);
    }
  }, [debounceValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input 
        value={text} 
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg" type="text" 
        placeholder="Search on the clone Google Search engine"
        onChange={(e) => { 
          return setText(e.target.value);
        }}
      />
      {!text && (
        <button type="button" onClick={() => setText('')} className="absolute top-1.5 right-4 text-2xl text-gray-500">
          X
        </button>
      )}
      <Links/>
    </div>
  )
}
