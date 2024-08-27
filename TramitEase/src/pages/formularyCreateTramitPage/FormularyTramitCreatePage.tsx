import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, MenuItem, Typography, Button } from '@mui/material';
import { useTypeTramits } from '../../shared/hooks/useTypeTramits.ts';
import { TypeTramit } from '../../entities/TypeTramit.ts';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';

const FormularyTramitCreatePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchTypeTramitsByTramitadorId } = useTypeTramits();
    const [typeTramits, setTypeTramits] = useState<TypeTramit[]>([]);
    const [tramitId, setTramitId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');

    // State for procedures
    const [procedures, setProcedures] = useState<{
        name: string;
        description: string;
        steps: { name: string; description: string; days: number }[];
    }[]>([]);

    useEffect(() => {
        if (id) {
            fetchTypeTramitsByTramitadorId(parseInt(id)).then(r =>
                setTypeTramits(r)
            );
        }
    }, [id]);

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTramitId(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };

    const handleProcedureNameChange = (index: number, value: string) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[index].name = value;
        setProcedures(updatedProcedures);
    };

    const handleProcedureDescriptionChange = (index: number, value: string) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[index].description = value;
        setProcedures(updatedProcedures);
    };

    const handleAddProcedure = () => {
        setProcedures([
            ...procedures,
            { name: '', description: '', steps: [] }
        ]);
    };

    const handleAddStep = (procedureIndex: number) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[procedureIndex].steps.push({ name: '', description: '', days: 0 });
        setProcedures(updatedProcedures);
    };

    const handleStepChange = (procedureIndex: number, stepIndex: number, field: string, value: any) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[procedureIndex].steps[stepIndex] = { ...updatedProcedures[procedureIndex].steps[stepIndex], [field]: value };
        setProcedures(updatedProcedures);
    };

    const handleSubmit = () => {
        console.log('ID del Trámite:', tramitId);
        console.log('Nombre del Trámite:', name);
        console.log('Tipo de Trámite:', selectedType);
        console.log('Procedimientos:', procedures);
    };

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                minHeight: '640px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black' }}>
                Crear Nuevo Trámite
            </Typography>
            <TextField
                label="ID del Trámite"
                value={tramitId}
                onChange={handleIdChange}
                fullWidth
            />
            <TextField
                label="Nombre del Trámite"
                value={name}
                onChange={handleNameChange}
                fullWidth
            />
            <TextField
                id="outlined-select-type"
                select
                label="Tipo de Trámite"
                value={selectedType}
                onChange={handleTypeChange}
                fullWidth
                helperText="Seleccione el tipo de trámite"
            >
                {typeTramits.map((type) => (
                    <MenuItem key={type.idTypeTramit} value={type.idTypeTramit}>
                        {type.name}
                    </MenuItem>
                ))}
            </TextField>
            {procedures.map((procedure, procedureIndex) => (
                <Box key={procedureIndex} sx={{ marginTop: '20px' }}>
                    <Typography variant="h5" component="h2" gutterBottom style={{ color: 'black' }}>
                        Añadir Procedimiento
                    </Typography>
                    <TextField
                        label="Nombre del Procedimiento"
                        value={procedure.name}
                        onChange={(e) => handleProcedureNameChange(procedureIndex, e.target.value)}
                        fullWidth
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Descripción del Procedimiento"
                        value={procedure.description}
                        onChange={(e) => handleProcedureDescriptionChange(procedureIndex, e.target.value)}
                        fullWidth
                        sx={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleAddStep(procedureIndex)}>
                        Añadir Paso del Procedimiento
                    </Button>
                    {procedure.steps.map((step, stepIndex) => (
                        <Box key={stepIndex} sx={{ marginTop: '10px' }}>
                            <Typography variant="h5" component="h2" gutterBottom style={{ color: 'black' }}>
                                Añadir Paso al Procedimiento
                            </Typography>
                            <TextField
                                label="Nombre del Paso"
                                value={step.name}
                                onChange={(e) => handleStepChange(procedureIndex, stepIndex, 'name', e.target.value)}
                                fullWidth
                                sx={{ marginBottom: '10px' }}
                            />
                            <TextField
                                label="Descripción del Paso"
                                value={step.description}
                                onChange={(e) => handleStepChange(procedureIndex, stepIndex, 'description', e.target.value)}
                                fullWidth
                                sx={{ marginBottom: '10px' }}
                            />
                            <TextField
                                label="Días Durante"
                                type="number"
                                value={step.days}
                                onChange={(e) => handleStepChange(procedureIndex, stepIndex, 'days', parseInt(e.target.value))}
                                fullWidth
                            />
                        </Box>
                    ))}
                </Box>
            ))}
            <Button variant="contained" color="secondary" onClick={handleAddProcedure}>
                Añadir Procedimiento
            </Button>

            <CustomButton
                color={'ternary'}
                onClick={handleSubmit}
                $textStyle={'bold'}
                $text={"Guardar Trámite"}
                size={'xs'}
            />
        </Box>
    );
};

export default FormularyTramitCreatePage;
