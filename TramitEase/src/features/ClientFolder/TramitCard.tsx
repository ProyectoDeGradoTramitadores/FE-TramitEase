import React from 'react';
import { TramitCardProps } from '../../shared/types/ClientFolderProps.ts';
import { Card, Name, Image } from './TramitCard.styles.ts';

const TramitCard: React.FC<TramitCardProps> = ({ procedureName, imageUrl }) => {
    return (
        <Card>
            <Image src={imageUrl} alt={procedureName} />
            <Name>{procedureName}</Name>
        </Card>
    );
};

export default TramitCard;
