export interface CommonProps {
    size: 'xs' | 's' | 'm' | 'l' | 'xl';
    color: 'primary' | 'secondary' | 'ternary' | 'background';
    onClick?: () => void;
}

export interface CustomButtonProps extends CommonProps {
    $textStyle: 'normal' | 'bold';
    $text: string;
    disabled?: boolean;
}
