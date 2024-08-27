import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from 'styled-components';
import { ProcedureStepListProps } from '../../types/ProceduresListProps';

const ProcedureStepsList: React.FC<ProcedureStepListProps> = ({ procedureWithSteps }) => {
    const theme = useTheme();

    return (
        <List component="ol">
            {procedureWithSteps.length ? (
                procedureWithSteps.map((procedure, index) => (
                    <List key={procedure.idStepProcedure} component="ol" sx={{ pl: 3 }}>
                        <ListItem key={procedure.idStepProcedure}>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" color={theme.colors.secondary.hower}>
                                        {`${index + 1} ${procedure.nameStep}`}
                                    </Typography>
                                }
                                secondary={
                                    <div>
                                        <Typography variant="body2" color={theme.colors.secondary.default}>
                                            Requerimientos: {procedure.requirements}
                                        </Typography>
                                        <Typography variant="body2" color={theme.colors.secondary.default}>
                                            Días de Duración: {procedure.dayDuring}
                                        </Typography>
                                    </div>
                                }
                            />
                        </ListItem>
                    </List>
                ))
            ) : (
                <Typography variant="body2" color="text.primary" sx={{ ml: 6, marginTop: '12px' }}>
                    No se encontraron pasos.
                </Typography>
            )}
        </List>
    );
};

export default ProcedureStepsList;
