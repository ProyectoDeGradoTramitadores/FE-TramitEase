import {
    Typography
} from '@mui/material';
import ProcedureComponent from '../../features/ProgressClient/ProcedureComponent.tsx';

const ProgressClientPage = () => {
    return (
        <div>
            <Typography variant="h4">Progreso de los Procedimientos</Typography>
            <ProcedureComponent/>
        </div>
    );
};

export default ProgressClientPage;
