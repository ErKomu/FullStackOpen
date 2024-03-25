import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import { apiBaseUrl } from "../../constants";
import EntryDetails from "./entryDetails";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { ListItemIcon } from '@mui/material';
import axios from 'axios';

import { Gender, Patient, Diagnosis, EntryWithoutId } from "../../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientResponse = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patientResponse.data);

        const diagnosesResponse = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(diagnosesResponse.data);
      } catch (error) {
        console.error("Error fetching patient or diagnoses:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const genderIcon = () => {
    if (patient) {
      switch (patient.gender) {
        case Gender.Male:
          return <MaleIcon />;
        case Gender.Female:
          return <FemaleIcon />;
        default:
          return null;
      }
    }
    return null;
  };
  

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Patient Detail
      </Typography>
      {patient ? (
        <Box>
          <Typography variant="h5">{patient.name}</Typography>
          <ListItemIcon>
            {genderIcon()}
          </ListItemIcon>
          <Typography>{`ssn: ${patient.ssn}`}</Typography>
          <Typography>{`Gender: ${patient.gender}`}</Typography>
          <Typography>{`Occupation: ${patient.occupation}`}</Typography>
          <Typography variant="h5">Entries</Typography>
          {patient.entries.map((entry: EntryWithoutId, index: number) => (
            <Box key={index}>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
};

export default PatientDetailPage;

