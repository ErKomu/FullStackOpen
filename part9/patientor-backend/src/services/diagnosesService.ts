import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

export const getDiagnoses = (): Diagnosis[] => {
console.log(diagnoses);
  return diagnoses;
};

export default {
  getDiagnoses,
};
