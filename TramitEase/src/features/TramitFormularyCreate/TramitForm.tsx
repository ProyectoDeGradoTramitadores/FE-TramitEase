import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useTypeTramits } from '../../shared/hooks/useTypeTramits';
import { TypeTramit } from '../../entities/TypeTramit';
import { IDS } from '../../shared/constants/routes.ts';
import { TramitFormProps } from '../../shared/types/FormComponentProps.ts';

const TramitForm: React.FC<TramitFormProps> = ({
                                                   tramitId, setTramitId,
                                                   name, setName,
                                                   selectedType, setSelectedType,
                                               }) => {
    const { fetchTypeTramitsByTramitadorId } = useTypeTramits();
    const [typeTramits, setTypeTramits] = React.useState<TypeTramit[]>([]);
    const id = IDS().TRAMITADOR_ID;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchTypeTramitsByTramitadorId(parseInt(id));
                setTypeTramits(result);
            } catch (error) {
                console.error('Error fetching Type Tramits:', error);
            }
        };

        fetchData();
    }, [id]);


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <TextField
                label="ID del Trámite"
                value={tramitId}
                onChange={(e) => setTramitId(e.target.value)}
                fullWidth
            />
            <TextField
                label="Nombre del Trámite"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
            <TextField
                id="outlined-select-type"
                select
                label="Tipo de Trámite"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                fullWidth
                helperText="Seleccione el tipo de trámite"
            >
                {typeTramits.map((type) => (
                    <MenuItem key={type.idTypeTramit} value={type.idTypeTramit}>
                        {type.name}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default TramitForm;