import React, { useEffect, useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { TramitFieldProps } from '../../types/StatusFieldProps.ts';
import { useTramits } from '../../hooks/useTramits.ts';
import { Tramit } from '../../../entities/Tramit.ts';

const TramitStatusField: React.FC<TramitFieldProps> = ({
                                                           tramitadorId,
                                                           onChange,
                                                           tramitId
                                                       }) => {
    const { fetchTramitsByTramitadorId } = useTramits();
    const [tramits, setTramits] = useState<Tramit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTramits = async () => {
            if (tramitadorId) {
                try {
                    const fetchedTramits = await fetchTramitsByTramitadorId(parseInt(tramitadorId));
                    setTramits(fetchedTramits);
                } catch (error) {
                    console.error('Error fetching tramits:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchTramits();
    }, [tramitadorId]);

    return (
        <Box sx={{ flex: '1 1 calc(25% - 26px)', minWidth: '220px' }}>
            <TextField
                id="outlined-select-tramit"
                select
                label="Tramits"
                value={tramitId || ''}
                onChange={onChange}
                helperText="Seleccione un trámite"
                disabled={loading || tramits.length === 0}
            >
                {tramits.map((tramit) => (
                    <MenuItem key={tramit.idTramit} value={tramit.idTramit}>
                        {tramit.name}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default TramitStatusField;
