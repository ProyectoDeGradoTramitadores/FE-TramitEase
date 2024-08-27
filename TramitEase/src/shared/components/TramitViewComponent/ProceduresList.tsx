import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from 'styled-components';
import { ProceduresListProps } from '../../types/ProceduresListProps.ts';

const ProceduresList: React.FC<ProceduresListProps> = ({ procedures, proceduresWithSteps }) => {
    const theme = useTheme();

    return (
        <List component="ol">
            {procedures.map((procedure, index) => (
                <div key={procedure.idProcedure}>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography sx={{ mb: 2 }} variant="h6" color={theme.colors.primary.default}>
                                    {`${index + 1}. ${procedure.name}`}
                                </Typography>
                            }
                            secondary={
                                <div>
                                    <Typography variant="body2" color={theme.colors.secondary.default}>
                                        Descripcion: {procedure.description}
                                    </Typography>
                                    <Typography variant="body2" color={theme.colors.secondary.default}>
                                        Dias de Duracion: {procedure.dayDuring}
                                    </Typography>
                                </div>
                            }
                        />
                    </ListItem>
                    <Typography variant="h6" color={theme.colors.ternary.hower} sx={{ ml: 4, mb: -4 }}>
                        Pasos del Procedimiento:
                    </Typography>
                    {proceduresWithSteps.get(procedure.idProcedure || 0)?.length ? (
                        <List component="ol" sx={{ pl: 3 }}>
                            {proceduresWithSteps.get(procedure.idProcedure || 0)?.map((step, stepIndex) => (
                                <ListItem key={step.idStepProcedure}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" color={theme.colors.secondary.hower}>
                                                {`${index + 1}.${stepIndex + 1} ${step.nameStep}`}
                                            </Typography>
                                        }
                                        secondary={
                                            <div>
                                                <Typography variant="body2" color={theme.colors.secondary.default}>
                                                    Requerimientos: {step.requirements}
                                                </Typography>
                                                <Typography variant="body2" color={theme.colors.secondary.default}>
                                                    Dias de Duracion: {step.dayDuring}
                                                </Typography>
                                            </div>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.primary" sx={{ ml: 6 }}>
                            No se encontro Pasos.
                        </Typography>
                    )}
                </div>
            ))}
        </List>
    );
};

export default ProceduresList;
