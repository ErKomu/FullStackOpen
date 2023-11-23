import patientsData from '../../data/patients';
import { NonSensitivePatientInfo, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
  };

  const addPatient = (
     name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
  ): NewPatient => {

    const id = uuid();

  const newPatient = {
    id: id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient
};
