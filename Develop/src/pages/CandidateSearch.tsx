import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      try {
        const data = await searchGithub(); 
        setCandidates(data); 
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const currentCandidate = candidates[currentIndex];

  if (isLoading) {
    return <p>Loading candidates...</p>;
  }

  if (!currentCandidate) {
    return <p>No more candidates available to review.</p>;
  }

  return 
  <div>
      <h1>Candidate Search</h1>
      <div>
        <img
          src={currentCandidate.avatar_url}
          alt={`${currentCandidate.login}'s avatar`}
          width={100}
        />
        <h2>{currentCandidate.login}</h2>
        <p>GitHub URL: <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a></p>
        <div>
          <button onClick={() => saveCandidate(currentCandidate)}>+</button>
          <button onClick={skipCandidate}>-</button>
        </div>
      </div>
    </div>

  function saveCandidate(candidate: any) {
    console.log('Saved candidate:', candidate);
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidate]));
    setCurrentIndex((prev) => prev + 1); 
  }

  function skipCandidate() {
    console.log('Skipped candidate.');
    setCurrentIndex((prev) => prev + 1); 
  }
};

export default CandidateSearch;
