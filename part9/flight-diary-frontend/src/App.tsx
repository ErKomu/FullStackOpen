import React, { useEffect, useState } from 'react';
import AddDiaryEntryForm from './components/addDiaryForm';
import './App.css';

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

const App: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  const fetchDiaryEntries = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/diaries');
      if (!response.ok) {
        throw new Error('Failed to fetch diary entries');
      }
      const data = await response.json();
      setDiaryEntries(data);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
    }
  };

  return (
    <div className="App">
      <h1>add new diary entry</h1>
      <AddDiaryEntryForm/>
      <h1>Diary Entries</h1>
      <div className="diary-entries">
        {diaryEntries.map(entry => (
          <div key={entry.id} className="diary-entry">
            <p>Date: {entry.date}</p>
            <p>Weather: {entry.weather}</p>
            <p>Visibility: {entry.visibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
