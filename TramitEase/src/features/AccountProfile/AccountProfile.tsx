import React from 'react';
import { Tramitador } from '../../entities/Tramitador';
import {
    Container,
    ImageContainer,
    Image,
    InfoContainer,
    NameContainer,
    EditButton,
    DeleteButton,
    DetailsContainer,
    Title, ParagraphCustom,
} from './AccountProfile.styles';
import EditIcon from '@mui/icons-material/Edit';
import imageSrc from '../../shared/assets/image/iconProfile.jpeg';

interface UserProfileProps {
    tramitador: Tramitador;
}

const AccountProfile: React.FC<UserProfileProps> = ({ tramitador }) => {
    return (
        <Container>
            <ImageContainer>
                <Image src={imageSrc} alt="Profile" />
                <InfoContainer>
                    <NameContainer>
                        <span>{tramitador.name} {tramitador.lastName}</span>
                    </NameContainer>
                    <EditButton>
                        <EditIcon /> Edit
                    </EditButton>
                    <DeleteButton>
                        Delete Account
                    </DeleteButton>
                </InfoContainer>
            </ImageContainer>

            <DetailsContainer>
                <Title>Cuenta del Usuario</Title>
                <ParagraphCustom>Teléfono: {tramitador.phoneNumber}</ParagraphCustom>
                <ParagraphCustom>Email: {tramitador.email}</ParagraphCustom>
            </DetailsContainer>
        </Container>
    );
};

export default AccountProfile;
