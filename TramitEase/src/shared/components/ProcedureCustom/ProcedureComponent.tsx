import { Image, StyledBox, TextContainer } from './ProcedureComponent.styles.ts';
import folderClientImage from '../../assets/image/folderClient.png';
import { Typography } from '@mui/material';
import { ProcedureComponentProps } from '../../types/ProcedureComponentProps.ts';

const ProcedureComponent: React.FC<ProcedureComponentProps> = ({ name, daysDuring, onClick }) => {
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
                    Days During: {daysDuring}
                </Typography>
            </TextContainer>
        </StyledBox>
    );
};

export default ProcedureComponent;
