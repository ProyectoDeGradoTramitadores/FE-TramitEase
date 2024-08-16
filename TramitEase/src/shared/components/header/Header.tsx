import React, { useState } from 'react';
import LogoBlack from '../../assets/logo/black/LogoBlack.tsx';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderContainer, LogoContainer, MenuContainer, DropdownMenu } from './Header.styles';
import Menu from '../Menu/Menu.tsx';

const Header: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <HeaderContainer>
            <LogoContainer>
                <LogoBlack size={"l"} color={"primary"} />
            </LogoContainer>
            <MenuContainer onClick={toggleMenu}>
                <MenuIcon sx={{ fontSize: 60 }} />
            </MenuContainer>
            {menuVisible && (
                <DropdownMenu>
                    <Menu />
                </DropdownMenu>
            )}
        </HeaderContainer>
    );
};

export default Header;
