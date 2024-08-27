import { TramitComponentProps } from '../../types/TramitComponentProps.ts';
import { Image, StyledBox, TextContainer } from './TramitComponent.styles.ts';
import folderClientImage from '../../assets/image/folderClient.png';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const TramitComponent: React.FC<TramitComponentProps> = ({ name, type, onClick }) => {
    const [resolvedType, setResolvedType] = useState<string>('');

    useEffect(() => {
        if (type instanceof Promise) {
            type.then(resolvedType => setResolvedType(resolvedType));
        } else {
            setResolvedType(type);
        }
    }, [type]);
    return (
        <StyledBox onClick={onClick}>
            <Image src={folderClientImage} alt={name} />
            <TextContainer>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        width: 'auto',
                        wordBreak: 'break-word',
                        color: '#ffff',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        width: 'auto',
                        wordBreak: 'break-word',
                        color: '#ffff',

                    }}
                >
                    {resolvedType}
                </Typography>
            </TextContainer>
        </StyledBox>
    );
};

export default TramitComponent;
