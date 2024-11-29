import React from 'react';
import { Button, Typography } from '@mui/material';
import { ClientFoldersTableProps } from '../../types/ClientProps.ts';

const ClientFoldersTable: React.FC<ClientFoldersTableProps> = ({ clientFolders, idTramitador }) => {
    return (
        <div>
            <Typography
                variant="h4"
                style={{ fontWeight: 'bold', marginBottom: '20px' }}
            >
                Carpetas del Cliente
            </Typography>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#fd6214' }}>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '15px', color: 'white' }}>Nombre</th>
                    <th style={{ border: '1px solid #ddd', padding: '15px', color: 'white' }}>Día de Inicio</th>
                    <th style={{ border: '1px solid #ddd', padding: '15px', color: 'white' }}>Día de Finalización</th>
                    <th style={{ border: '1px solid #ddd', padding: '15px', color: 'white' }}>Estado</th>
                    <th style={{ border: '1px solid #ddd', padding: '15px', color: 'white' }}>Accede a la carpeta</th>
                </tr>
                </thead>
                <tbody>
                {clientFolders.map((folder, index) => (
                    <tr key={index}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{folder.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {folder.creationDate
                                ? folder.creationDate
                                : 'Todavía no se inició la carpeta del cliente'}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {folder.endDate
                                ? folder.endDate
                                : folder.creationDate
                                    ? 'En Progreso'
                                    : 'Carpeta de cliente todavía no iniciada'}
                        </td>
                        <td
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center',
                            }}
                        >
                            {folder.endDate
                                ? 'Completado'
                                : folder.creationDate
                                    ? 'En Progreso'
                                    : 'Sin Iniciar'}
                        </td>
                        <td
                            style={{
                                border: '1px solid #ddd',
                                padding: '10px',
                                textAlign: 'center',
                            }}
                        >
                            <Button
                                variant="contained"
                                style={{ backgroundColor: 'green', color: 'white' }}
                                onClick={() => {
                                    window.location.href = `/Tramitador/${idTramitador}/ClientsFolder/ClientFolder/${folder.idClientFolder}`;
                                }}
                            >
                                Ver Carpeta
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientFoldersTable;
