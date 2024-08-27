import React from 'react';
import { Box } from '@mui/material';
import CustomButton from '../components/buttons/CustomButton.tsx';
import { useNavigate } from 'react-router-dom';
import { CustomButtonStepsGroupProps } from '../types/ProcedureComponentProps.ts';

const CustomButtonStepsProcedureGroup: React.FC<CustomButtonStepsGroupProps> = ({idProcedure}) => {
    const navigate = useNavigate();

    const handleClick = (path: string) => () => {
        navigate(path);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '18px', mt: 2 }}>
            <CustomButton $text="exit" $textStyle="bold" size="s" color="secondary"
                          onClick={handleClick('/TramitEase/Tramitador/1/Custom/TramitsCustom')}/>
            <CustomButton $text="Edit Tramit" $textStyle="bold" size="s" color="ternary"
                          onClick={handleClick(`/TramitEase/Tramitador/1/Custom/TramitsCustom/ProcedureEditPage/${idProcedure}`)}/>
        </Box>
    );
};

export default CustomButtonStepsProcedureGroup;
