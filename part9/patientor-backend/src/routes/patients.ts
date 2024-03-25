import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
//import toNewEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientInfo());
});

router.get('/:id', (req, res) => {
    console.log('Patients by id called');
    res.send(patientService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
        try {
            const newPatient = toNewPatient(req.body);
    
            const addedPatient = patientService.addPatient(
                newPatient
            );
            res.json(addedPatient);
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message;
            }
            res.status(400).send(errorMessage);
        }
});

router.post('/:id/entries', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if( patient === undefined ){
        res.status(404).send('patient not found')
    }
});

export default router;
