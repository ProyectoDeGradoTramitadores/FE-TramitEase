import React from 'react';
import { CardClientListProps } from '../../shared/types/CardProps.ts';
import CardClientView from '../../shared/components/cards/CardClientView.tsx';

const CardClientList: React.FC<CardClientListProps> = ({ clients }) => {
    return (
        <div style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '23px',
            padding: '20px'
        }}>
            {clients.map((client, index) => (
                <CardClientView keyClient={client.keyClient} key={index} name={client.name} ci={client.ci} />
            ))}
        </div>
    );
};

export default CardClientList;
