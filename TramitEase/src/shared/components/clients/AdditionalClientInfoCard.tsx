import React from 'react';
import { Card, Typography } from '@mui/material';
import { AdditionalClientInfoCardProps } from '../../types/ClientProps.ts';

const AdditionalClientInfoCard: React.FC<AdditionalClientInfoCardProps> = ({ additionalFields }) => {
    return (
        <Card
            style={{
                display: 'flex',
                padding: '20px',
                borderRadius: '43px',
                backgroundColor: 'rgb(27,27,27)',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                alignItems: 'center',
            }}
        >
            <div style={{ padding: '80px' }}>
                <Typography
                    variant="h4"
                    style={{ fontWeight: 'bold', color: '#c6c6c6' }}
                    gutterBottom
                >
                    Información Adicional del Cliente:
                </Typography>
                {additionalFields.map((addField) => (
                    <Typography
                        variant="h6"
                        gutterBottom
                        style={{ color: '#c6c6c6' }}
                        key={addField.id}
                    >
                        <strong>{addField.label}: </strong> {addField.value?.toString()}
                    </Typography>
                ))}
            </div>
        </Card>
    );
};

export default AdditionalClientInfoCard;
