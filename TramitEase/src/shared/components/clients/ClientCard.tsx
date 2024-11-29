import React from "react";
import { Card, Avatar, Typography } from "@mui/material";
import { ClientCardProps } from '../../types/ClientProps.ts';



const ClientCard: React.FC<ClientCardProps> = ({ client, gender, getAvatar }) => {
    return (
        <Card
            style={{
                display: "flex",
                padding: "60px",
                backgroundColor: "#d3d3d3",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                alignItems: "center",
                borderRadius: "43px",
            }}
        >
            <Avatar
                src={getAvatar(gender)}
                alt="Profile Picture"
                style={{ width: "350px", height: "350px", borderRadius: "50%" }}
            />
            <div style={{ padding: "80px" }}>
                <Typography variant="h3" style={{ fontWeight: "bold" }} gutterBottom>
                    {client?.name} {client?.secondName ?? ""} {client?.lastName ?? ""}{" "}
                    {client?.surname ?? ""}
                </Typography>
                {client?.ciClient && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Cédula de Identidad:</strong> {client.ciClient}
                    </Typography>
                )}
                {client?.secondName && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Segundo Nombre:</strong> {client.secondName}
                    </Typography>
                )}
                {client?.surname && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Segundo Apellido:</strong> {client.surname}
                    </Typography>
                )}
                {client?.birth && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Fecha de Nacimiento:</strong> {client.birth}
                    </Typography>
                )}
                {client?.email && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Correo Electrónico:</strong> {client.email}
                    </Typography>
                )}
                {client?.cellNumber && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Número de Celular:</strong> {client.cellNumber}
                    </Typography>
                )}
                {client?.maritalStatus && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Estado Civil:</strong> {client.maritalStatus}
                    </Typography>
                )}
                {client?.nationality && (
                    <Typography variant="h6" gutterBottom>
                        <strong>Nacionalidad:</strong> {client.nationality}
                    </Typography>
                )}
            </div>
        </Card>
    );
};

export default ClientCard;
