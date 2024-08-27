import React from 'react';
import { Box, TextField } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { ButtonTypeCustonTramitContainer } from './TypeTramitButtons.styles.ts';
import { TypeTramitCreateViewProps } from '../../shared/types/TypeTramitComponentProps.ts';
import { useTheme } from 'styled-components';

const TypeTramitCreateView: React.FC<TypeTramitCreateViewProps> = ({ newName, setNewName, handleCancelCreate, handleSaveCreate }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: theme.colors.primary.default,
                width: '406px',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}
        >
            <TextField
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                    }
                }}
            />
            <ButtonTypeCustonTramitContainer>
                <CustomButton
                    color={'primary'}
                    $text="Cancel"
                    $textStyle="bold"
                    size="xs"
                    onClick={handleCancelCreate}
                />
                <CustomButton
                    color={'ternary'}
                    $text="Save"
                    $textStyle="bold"
                    size="xs"
                    onClick={handleSaveCreate}
                />
            </ButtonTypeCustonTramitContainer>
        </Box>
    );
};

export default TypeTramitCreateView;
