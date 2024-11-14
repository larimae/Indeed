import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Retrieve saved candidates from local storage
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login} style={{ marginBottom: '20px' }}>
              <img
                src={candidate.avatar_url}
                alt={`${candidate.login}'s avatar`}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <p>
                <strong>Name:</strong> {candidate.name || 'N/A'}
              </p>
              <p>
                <strong>Username:</strong> {candidate.login}
              </p>
              <p>
                <strong>Location:</strong> {candidate.location || 'N/A'}
              </p>
              <p>
                <strong>Company:</strong> {candidate.company || 'N/A'}
              </p>
              <p>
                <strong>GitHub Profile:</strong>{' '}
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  {candidate.html_url}
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
