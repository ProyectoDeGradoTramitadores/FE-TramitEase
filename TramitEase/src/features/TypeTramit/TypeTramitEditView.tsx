import React from 'react';
import { Box, TextField } from '@mui/material';
import { TypeTramitEditViewProps } from '../../shared/types/TypeTramitComponentProps.ts';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { ButtonTypeCustonTramitContainer } from './TypeTramitButtons.styles.ts';

const TypeTramitEditView: React.FC<TypeTramitEditViewProps> = ({ editName, setEditName, handleCancelEdit, handleSaveEdit }) => (
    <Box>
        <TextField
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
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
            <CustomButton color="secondary" $text="Cancel" $textStyle="bold" size="xs" onClick={handleCancelEdit} />
            <CustomButton color="ternary" $text="Save" $textStyle="bold" size="xs" onClick={handleSaveEdit} />
        </ButtonTypeCustonTramitContainer>
    </Box>
);

export default TypeTramitEditView;
