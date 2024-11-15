import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import ErrorPage from './ErrorPage';
import { Candidate } from '../interfaces/Candidate.interface'; 

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
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
      console.log(users[0].login)
      if (users.length > 0) {
        const random = Math.floor(Math.random()* users.length)
        const detailedCandidate = await searchGithubUser(users[random].login);
        console.log(detailedCandidate)
        setCandidate(detailedCandidate);
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
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <p>Bio: {candidate.bio}</p>
          <button onClick={saveCandidate}>+</button>
          <button onClick={rejectCandidate}>-</button>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
  </div>
)}

export default CandidateSearch;
