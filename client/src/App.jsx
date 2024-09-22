import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState(''); // For storing JSON input
  const [responseData, setResponseData] = useState(null); // For storing response from the backend
  const [error, setError] = useState(''); // For storing error messages
  const [filter, setFilter] = useState({
    alphabets: true,
    numbers: true,
    highestLowercase: true,
  }); // For filtering which part of the response to show

  // Handles the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = JSON.parse(jsonInput); // Parse the input as JSON

      // Send the request to the backend
      const response = await fetch('https://your-backend.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });

      const data = await response.json(); // Parse the response as JSON
      setResponseData(data); // Store the response data
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Invalid JSON input'); // Set error if JSON is invalid
    }
  };

  // Function to render response based on the filter checkboxes
  const renderResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

    return (
      <div>
        {filter.numbers && (
          <div>
            <strong>Numbers:</strong> {JSON.stringify(numbers)}
          </div>
        )}
        {filter.alphabets && (
          <div>
            <strong>Alphabets:</strong> {JSON.stringify(alphabets)}
          </div>
        )}
        {filter.highestLowercase && (
          <div>
            <strong>Highest Lowercase Alphabet:</strong> {highest_lowercase_alphabet}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON here"
          style={{ width: '300px', height: '100px' }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h2>Response:</h2>
          {renderResponse()}

          <div style={{ marginTop: '20px' }}>
            <strong>Filter:</strong>
            <div>
              <input
                type="checkbox"
                checked={filter.numbers}
                onChange={(e) => setFilter({ ...filter, numbers: e.target.checked })}
              /> Numbers
            </div>
            <div>
              <input
                type="checkbox"
                checked={filter.alphabets}
                onChange={(e) => setFilter({ ...filter, alphabets: e.target.checked })}
              /> Alphabets
            </div>
            <div>
              <input
                type="checkbox"
                checked={filter.highestLowercase}
                onChange={(e) => setFilter({ ...filter, highestLowercase: e.target.checked })}
              /> Highest Lowercase Alphabet
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;