import { Diagnosis, Entry, EntryWithoutId } from "../../types";
import { List, ListItem, ListItemText } from '@mui/material';

interface EntryDetailsProps {
  entry: EntryWithoutId;
  diagnoses: Diagnosis[]; 
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
 
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <List>
            <ListItem>
              <ListItemText primary={`${entry.date} ${entry.description}`} />
            </ListItem>
            <List>
              {entry.diagnosisCodes?.map((code, index) => {
                const diagnosis = diagnoses.find(d => d.code === code);
                const description = diagnosis ? diagnosis.name : 'Description not available';

                return (
                  <ListItem key={index}>
                    <ListItemText primary={`${code}: ${description}`} />
                  </ListItem>
                );
              })}
            </List>       
          </List>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <List>
            <ListItem>
              <ListItemText primary={`${entry.date} ${entry.description}`} />
            </ListItem>
            <List>
              {entry.diagnosisCodes?.map((code, index) => {
                const diagnosis = diagnoses.find(d => d.code === code);
                const description = diagnosis ? diagnosis.name : 'Description not available';

                return (
                  <ListItem key={index}>
                    <ListItemText primary={`${code}: ${description}`} />
                  </ListItem>
                );
              })}
            </List>       
          </List>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <List>
            <ListItem>
              <ListItemText primary={`${entry.date} ${entry.description}`} />
            </ListItem>
            <List>
              {entry.diagnosisCodes?.map((code, index) => {
                const diagnosis = diagnoses.find(d => d.code === code);
                const description = diagnosis ? diagnosis.name : 'Description not available';

                return (
                  <ListItem key={index}>
                    <ListItemText primary={`${code}: ${description}`} />
                  </ListItem>
                );
              })}
            </List>       
          </List>
        </div>
      );
    default:
      return null;
  }
};

export default EntryDetails;
