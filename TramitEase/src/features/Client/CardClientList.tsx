import React from 'react';
import { CardClientListProps } from '../../shared/types/CardProps.ts';
import CardClientView from '../../shared/components/cards/CardClientView.tsx';

const CardClientList: React.FC<CardClientListProps> = ({ clients }) => {
    return (
        <div style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: '63px',
            padding: '20px 0px 0px 150px',
        }}>
            {clients.map((client, index) => (
                <CardClientView keyClient={client.keyClient} key={index}
                                name={client.name} ci={client.ci} lastName={client?.lastName} />
            ))}
        </div>
    );
};

export default CardClientList;
