import React from 'react';
import { TextFieldCustomProps } from '../../types/TextFieldCustomProps.ts';
import { CustomTextField } from './TextFieldCustom.styles.ts';

const TextFieldCustom: React.FC <TextFieldCustomProps> =
    ({ isRequired, onChange, text, value })=> {
        return(
            <CustomTextField  onChange={onChange} required={isRequired}
                             id="outlined-required"
                              value={value}
                             label={text} />
        );
    };

export  default TextFieldCustom;