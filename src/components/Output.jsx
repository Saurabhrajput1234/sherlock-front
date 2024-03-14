import React, { useState } from 'react';

function Output() {
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  console.log(name)

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a name to search.');
      return;
    }

    try {
      const response = await fetch(`/filedata/${name}`);
      const data = await response.json();
    
      if (response.ok) {
        setSearchResult(data);
      } else {
        alert(data.error);
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred, please try again later.');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  console.log(searchResult);

  return (
    <div>
      <h1>Search Data by Name</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter Name to Search"
        />
        <button type="submit">Search</button>
      </form>
      {searchResult && (
        <div>
          <h2>{searchResult.name}</h2>
          <p>
            <strong>Text Data:</strong> {searchResult.textdata}
          </p>
          <p>
            <strong>File URL:</strong>{' '}
            <a href={searchResult.file} target="_blank" rel="noopener noreferrer">
              {searchResult.file}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Output;
