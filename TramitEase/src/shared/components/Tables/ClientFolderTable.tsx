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
    console.log("ss", rows);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="h6">Nombre de la carpeta del cliente</Typography></TableCell>
                        <TableCell><Typography variant="h6">Duracion (Dias)</Typography></TableCell>
                        <TableCell><Typography variant="h6">Dia de Inicio</Typography></TableCell>
                        <TableCell><Typography variant="h6">Dia estimado de finalizacion</Typography></TableCell>
                        <TableCell><Typography variant="h6">Dia de finalizacion</Typography></TableCell>
                        <TableCell><Typography variant="h6">Competado</Typography></TableCell>
                        <TableCell><Typography variant="h6">Dias de Retrasos/Sobrantes</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.clientFolderName}</TableCell>
                            <TableCell>{row.durationDays}</TableCell>
                            <TableCell>{row?.startDate !== undefined ? row.startDate : "Todavia la carpeta del cliente no se inicio"}</TableCell>
                            <TableCell>{row?.estimatedCompletionDate !== undefined ? row.estimatedCompletionDate :
                                "Todavia la carpeta del cliente no se inicio"}</TableCell>
                            <TableCell>{row.completionDate === "" ?
                                (row?.startDate !== undefined ? "La carpeta del cliente sigue en progreso" :
                                    "Todavia la carpeta del cliente no se inicio") : row.completionDate}</TableCell>
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
