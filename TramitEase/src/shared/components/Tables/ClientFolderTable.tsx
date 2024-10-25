import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import { ClientFolderTableProps } from '../../types/MetricsClientFolderProps.ts';

const ClientFolderTable: React.FC<ClientFolderTableProps> = ({ rows }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="h6">Client Folder Name</Typography></TableCell>
                        <TableCell><Typography variant="h6">Duration (Days)</Typography></TableCell>
                        <TableCell><Typography variant="h6">Start Date</Typography></TableCell>
                        <TableCell><Typography variant="h6">Estimated Completion Date</Typography></TableCell>
                        <TableCell><Typography variant="h6">Completion Date</Typography></TableCell>
                        <TableCell><Typography variant="h6">Completed</Typography></TableCell>
                        <TableCell><Typography variant="h6">Delay/Surplus Days</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.clientFolderName}</TableCell>
                            <TableCell>{row.durationDays}</TableCell>
                            <TableCell>{row.startDate}</TableCell>
                            <TableCell>{row.estimatedCompletionDate}</TableCell>
                            <TableCell>{row.completionDate}</TableCell>
                            <TableCell>{row.isCompleted ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{row.isCompleted ?  (row.isDelay? (row.delayOrSurplusDays + " Dias de retraso")
                                : (row.delayOrSurplusDays + " Dias que sobraron")) : "En progreso"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClientFolderTable;
