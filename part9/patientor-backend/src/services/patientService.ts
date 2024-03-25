import patientsData from '../../data/patients';
import { NonSensitivePatientInfo, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
  };

const addPatient = ( entry: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatientInfo,
  addPatient
};
