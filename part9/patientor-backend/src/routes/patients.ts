import express from 'express';
import patientService from '../services/patientService';
//import { setTokenSourceMapRange } from 'typescript';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientInfo());
});


router.post('/', (req, res) => {
        try {
            const newPatient = toNewPatient(req.body);
    
            const addedPatient = patientService.addPatient(
                newPatient.name,
                newPatient.dateOfBirth,
                newPatient.ssn,
                newPatient.gender,
                newPatient.occupation
            );
            res.json(addedPatient);
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message;
            }
            res.status(400).send(errorMessage);
        }
})

export default router;
