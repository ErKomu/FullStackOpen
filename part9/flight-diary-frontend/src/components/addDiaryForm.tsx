import React, { useState } from 'react';

const AddDiaryEntryForm: React.FC = () => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/diaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, weather, visibility, comment }),
            });

            if (!response.ok) {             
                throw new Error('Failed to add diary entry');
            }

            setDate('');
            setWeather('');
            setVisibility('');
            setComment('');
            setErrorMessage('');
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            } else {
                setErrorMessage('Failed to add diary entry');
            }
            console.error('Error adding diary entry:', error);
        }
    };

    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Date:
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Weather:
                        <input type="radio" name="weather" value="sunny" checked={weather === 'sunny'} onChange={() => setWeather('sunny')} /> Sunny
                        <input type="radio" name="weather" value="rainy" checked={weather === 'rainy'} onChange={() => setWeather('rainy')} /> Rainy
                        <input type="radio" name="weather" value="windy" checked={weather === 'windy'} onChange={() => setWeather('windy')} /> Windy
                    </label>
                </div>
                <div>
                    <label>
                        Visibility:
                        <input type="radio" name="visibility" value="good" checked={visibility === 'good'} onChange={() => setVisibility('good')} /> Good
                        <input type="radio" name="visibility" value="poor" checked={visibility === 'poor'} onChange={() => setVisibility('poor')} /> Poor
                    </label>
                </div>
                <div>
                    <label>
                        Comment:
                        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Add Diary Entry</button>
            </form>
        </div>
    );
};

export default AddDiaryEntryForm;
