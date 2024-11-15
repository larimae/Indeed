import { useState, useEffect } from 'react';
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
            <li key={candidate.name} style={{ marginBottom: '20px' }}>
              <img
                src={candidate.avatar_url}
                alt={`${candidate.name}'s avatar`}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <p>
                <strong>Name:</strong> {candidate.name}
              </p>
              <p>
                <strong>Location:</strong> {candidate.location}
              </p>
              <p>
                <strong>Email:</strong> {candidate.email}
              </p>
              <p>
                <strong>Company:</strong> {candidate.company}
              </p>
              <p>
                <strong>Bio:</strong>{candidate.bio}
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
