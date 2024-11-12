import React from 'react';
import {CustomButtonProps} from "../../common/types.ts";
import styled from "styled-components";
import theme from "../../theme/theme.ts";
import {fontStyles} from "../../constants/typography.ts";


const Button = styled.button<CustomButtonProps>`
    color: ${theme.colors.shades.white};
    font-weight: ${(props) => fontStyles[props.size](props.$textStyle).fontWeight};
    line-height: ${(props) => fontStyles[props.size](props.$textStyle).lineHeight};
    padding: 10px 60px;
    border-radius: 50px;
    border: none;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s ease;
    box-shadow: none;

    background-color: ${({ theme, color }) =>
            theme.colors[color]?.default};

    &:hover {
        background-color: ${({ theme, color }) => theme.colors[color]?.hower};
    }

    &:active {
        background-color: ${({ theme, color }) => theme.colors[color]?.action};
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       size,
                                                       color,
                                                       $textStyle,
                                                       onClick,
                                                       $text,
                                                       disabled
                                                   }) => {
    return (
        <Button
            style={{ fontSize: fontStyles[size]($textStyle).fontSize}}
            size={size}
            color={color}
            $textStyle={$textStyle}
            onClick={onClick}
            $text={$text}
            disabled={disabled}>
            {$text}
        </Button>
    );
};

export default CustomButton;
