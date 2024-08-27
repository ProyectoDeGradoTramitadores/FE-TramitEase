import React from 'react';
import { Box } from '@mui/material';
import CustomButton from '../components/buttons/CustomButton.tsx';
import { useNavigate } from 'react-router-dom';
import { CustomButtonGroupProps } from '../types/TramitComponentProps.ts';

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({idTramit}) => {
    const navigate = useNavigate();

    const handleClick = (path: string) => () => {
        navigate(path);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '18px', mt: 2 }}>
            <CustomButton $text="exit" $textStyle="bold" size="s" color="secondary"
                          onClick={handleClick('/TramitEase/Tramitador/1/Custom/TramitsCustom')}/>
            <CustomButton $text="Edit Tramit" $textStyle="bold" size="s" color="ternary"
                          onClick={handleClick(`/TramitEase/Tramitador/1/Custom/TramitsCustom/TramitEditPage/${idTramit}`)}/>
        </Box>
    );
};

export default CustomButtonGroup;
