import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello fullstack');
});

app.get('/bmi', (_req, _res) => {
        const height: number = Number(_req.query.height);
        const weight: number = Number(_req.query.weight);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            return _res.status(400).json({ error: 'malformatted parameters' });
        }
        const bmi = calculateBmi(height, weight).message;
        _res.send({weight, height, bmi});
        return _res.status(200);
  });

  app.post('/exercises', (_req, _res) => {

    console.log(_req.body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = _req.body;
  
    if (!daily_exercises || !target) {
      return _res.status(400).json({ error: 'parameters missing' });
    }
  
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
      return _res.status(400).json({ error: 'malformatted parameters' });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return _res.json(result);
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});