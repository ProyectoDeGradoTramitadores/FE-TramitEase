import React from 'react';
import { Typography, Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TableProcedureProps } from '../../../shared/types/MetricsClientFolderProps.ts';

const TableProcedure: React.FC<TableProcedureProps> = ({ steps }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                Reportes por Procedimiento
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del Paso</TableCell>
                            <TableCell>Fecha de Inicio</TableCell>
                            <TableCell>Fecha Estimada de Finalización</TableCell>
                            <TableCell>Fecha de Finalización</TableCell>
                            <TableCell>Completado</TableCell>
                            <TableCell>A Tiempo / Con Retraso</TableCell>
                            <TableCell>Días de Retraso / Días Restantes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {steps.map((step, index) => (
                            <TableRow key={index}>
                                <TableCell>{step.nameStep}</TableCell>
                                <TableCell>{step.creationDate}</TableCell>
                                <TableCell>{step.estimateDate}</TableCell>
                                <TableCell>{step.endDate || 'Pendiente'}</TableCell>
                                <TableCell>{step.completeStep ? 'Sí' : 'No'}</TableCell>
                                <TableCell>{step.delayStep? 'Con Retraso' : 'A Tiempo'}</TableCell>
                                <TableCell>
                                    {step.delayStep
                                        ? step.daysDelayOrOnTime > 0
                                            ? `${step.daysDelayOrOnTime} días de retraso`
                                            : `${Math.abs(step.daysDelayOrOnTime)} días sobrantes`
                                        : step.daysDelayOrOnTime > 0
                                            ? `A Tiempo, ${Math.abs(step.daysDelayOrOnTime)} días sobrantes`
                                            : step.endDate? 'A Tiempo' : 'En Progreso'
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TableProcedure;
