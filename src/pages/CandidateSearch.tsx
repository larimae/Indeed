import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import ErrorPage from './ErrorPage';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<any | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    setLoading(true);
    setError(false);
    try {
      const users = await searchGithub();
      if (users.length > 0) {
        setCandidate(users[0]); // Select the first candidate
      } else {
        setCandidate(null); // No more candidates
      }
    } catch (error) {
      console.error('Error fetching candidate:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      const updatedSavedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    }
    fetchCandidate(); // Fetch the next candidate
  };

  const rejectCandidate = () => {
    fetchCandidate(); // Simply fetch the next candidate
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
  <div>
  <h1>CandidateSearch</h1>;
  {loading ? (
        <p>Loading candidate...</p>
      ) : candidate ? (
        <div>
          <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
          <p>Name: {candidate.name}</p>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location}</p>
          <p>Company: {candidate.company}</p>
          <p>
            GitHub Profile: <a href={candidate.html_url}>{candidate.html_url}</a>
          </p>
          <button onClick={saveCandidate}>+</button>
          <button onClick={rejectCandidate}>-</button>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
  </div>
)}

export default CandidateSearch;
