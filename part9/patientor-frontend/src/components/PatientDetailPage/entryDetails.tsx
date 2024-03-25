import { Entry } from "../../types";
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { LocalHospital, Work, Healing } from '@mui/icons-material';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <Typography variant="h6">Hospital Entry</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalHospital />
              </ListItemIcon>
              <ListItemText primary={`Date: ${entry.date}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Description: ${entry.description}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Discharge: ${entry.discharge.date}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Criteria: ${entry.discharge.criteria}`} />
            </ListItem>
          </List>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Typography variant="h6">Occupational Healthcare Entry</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText primary={`Date: ${entry.date}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Description: ${entry.description}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Employer: ${entry.employerName}`} />
            </ListItem>
            {entry.sickLeave && (
              <ListItem>
                <ListItemText primary={`Sick Leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`} />
              </ListItem>
            )}
          </List>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <Typography variant="h6">Health Check Entry</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Healing />
              </ListItemIcon>
              <ListItemText primary={`Date: ${entry.date}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Description: ${entry.description}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Health Check Rating: ${entry.healthCheckRating}`} />
            </ListItem>
          </List>
        </div>
      );
    default:
      return null;
  }
};

export default EntryDetails;
