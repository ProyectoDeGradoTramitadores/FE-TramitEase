import React from 'react';
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
import { UserProfileProps } from '../../shared/types/UserProfileProps';
import useDeleteProfile from '../../shared/hooks/useDeleteProfile.ts';
import ModalText from '../../shared/components/Modals/ModalText.tsx';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { Box } from '@mui/material';
import useAccountTramitador from '../../shared/hooks/useAccountTramitador.ts';

const AccountProfile: React.FC<UserProfileProps> = ({ userProfileId }) => {
    const { isModalOpen, openModal, closeModal, confirmDeletion } = useDeleteProfile(userProfileId);
    const { isEditing, editedName, editedLastName, handleNameChange, handleLastNameChange,
        handleSaveChanges, handleCancelEditing, setIsEditing, tramitador
    } = useAccountTramitador(userProfileId);

    return (
        <>
            <Container>
                <ImageContainer>
                    <Image src={imageSrc} alt="Profile" />
                    <InfoContainer>
                        <NameContainer>
                            {isEditing ? (
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={handleNameChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '16px',
                                            borderRadius: '41px',
                                            backgroundColor: '#707070',
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={editedLastName}
                                        onChange={handleLastNameChange}
                                        style={{
                                            backgroundColor: '#707070',
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '16px',
                                            borderRadius: '41px',
                                        }}
                                    />
                                </div>
                            ) : (
                                <span>{tramitador?.name} {tramitador?.lastName}</span>
                            )}
                        </NameContainer>

                        {!isEditing ? (
                            <>
                                <EditButton onClick={() => setIsEditing(true)}>
                                    <EditIcon /> Editar
                                </EditButton>
                                <DeleteButton onClick={openModal}>
                                    Eliminar Cuenta
                                </DeleteButton>
                            </>
                        ) : (
                            <Box mt={"10px"} gap={"20px"} display="flex" flexDirection="column" >
                                <CustomButton
                                    $textStyle={'bold'} $text={'Guardar Cambios'}
                                    size={'s'} color={'primary'} onClick={handleSaveChanges}
                                />
                                <CustomButton
                                    $textStyle={'bold'} $text={'Cancelar'}
                                    size={'s'} color={'ternary'} onClick={handleCancelEditing}
                                />
                            </Box>
                        )}
                    </InfoContainer>
                </ImageContainer>

                <DetailsContainer>
                    <Title>Cuenta del Usuario</Title>
                    <ParagraphCustom>Teléfono: {tramitador?.phoneNumber}</ParagraphCustom>
                    <ParagraphCustom>Email: {tramitador?.email}</ParagraphCustom>
                </DetailsContainer>
                <ModalText
                    closeModal={closeModal}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    confirmDeletion={confirmDeletion}
                    textTIle={"¿Estás seguro que quieres eliminar la cuenta?"}
                    textHeader2={"Esta acción no se puede deshacer."}
                />
            </Container>
        </>
    );
};

export default AccountProfile;
