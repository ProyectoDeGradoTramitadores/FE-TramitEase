import React, { useState, useRef, useEffect } from 'react';
import LogoBlack from '../../assets/logo/black/LogoBlack.tsx';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderContainer, LogoContainer, MenuContainer, DropdownMenu } from './Header.styles';
import Menu from '../Menu/Menu.tsx';

const Header: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <HeaderContainer>
            <LogoContainer>
                <LogoBlack size={"l"} color={"primary"} />
            </LogoContainer>
            <MenuContainer onClick={toggleMenu}>
                <MenuIcon sx={{ fontSize: 60 }} />
            </MenuContainer>
            {menuVisible && (
                <DropdownMenu ref={menuRef}>
                    <Menu />
                </DropdownMenu>
            )}
        </HeaderContainer>
    );
};

export default Header;
