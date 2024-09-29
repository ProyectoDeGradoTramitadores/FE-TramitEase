import UploadFileIcon from '@mui/icons-material/UploadFile';
import TaskIcon from '@mui/icons-material/Task';
import { StepIconProps } from '@mui/material/StepIcon';
import { ColorlibStepIconRoot } from './CustomStepIcons.styles.ts';

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    let icon;
    if (completed) {
        icon = <TaskIcon />;
    } else {
        icon = <UploadFileIcon />;
    }

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icon}
        </ColorlibStepIconRoot>
    );
}

export default ColorlibStepIcon;
