import React from 'react';
import { MenuItemProps } from '../../types/MenuItemProps.ts';
import { MenuItemContainer } from './MenuItem.styles.ts';

const MenuItem: React.FC<MenuItemProps> = ({ title, onClick }) => {
    return (
        <MenuItemContainer onClick={onClick}>
            {title}
        </MenuItemContainer>
    );
};

export default MenuItem;
