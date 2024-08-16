import React from 'react';
import { DatePickerCustomProps } from '../../types/DatePickerCustomProps';
import { CustomDatePicker } from './DatePickerCustom.styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({ text, value, onChange }) => {
    const dayjsValue: Dayjs | null = value ? dayjs(value) : null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <CustomDatePicker
                    label={text}
                    value={dayjsValue}
                    onChange={(date) => {
                        if (onChange) {
                            onChange(date ? date.toISOString() : '');
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DatePickerCustom;
