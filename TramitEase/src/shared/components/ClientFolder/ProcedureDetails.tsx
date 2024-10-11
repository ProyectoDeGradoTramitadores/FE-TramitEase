import { Typography, Box } from '@mui/material';
import { ProcedureDetailsProps } from '../../types/ClientFolderProps';

const ProcedureDetails = ({ procedure }: ProcedureDetailsProps) => (
    <Box sx={{ mt: 2 }}>
        <Typography variant="h6">{procedure.name}</Typography>
        <Typography variant="body1">Descripción: {procedure.description}</Typography>
        <Typography variant="body1">Start Date: {procedure.startDate}</Typography>
        <Typography variant="body1">Estimated Date: {procedure.estimatedDate}</Typography>
        <Typography variant="body1">Duration: {procedure.durationDays} days</Typography>
        <Typography variant="body1">Status: {procedure.status}</Typography>
    </Box>
);

export default ProcedureDetails;
