import React from 'react';
import { MenuContainer, MenuSection } from './Menu.styles.ts';
import MenuItem from './MenuItem.tsx';
import { useNavigate, useParams } from 'react-router-dom';

const Menu: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleMenuClick = (path: string) => {
        navigate(`/TramitEase/Tramitador/${id}/${path}`);
    };

    return (
        <MenuContainer>
            <MenuSection>
                <MenuItem title="CARPETAS" onClick={() => handleMenuClick('ClientsFolder')} />
                <MenuItem title="PLANTILLAS DE TRAMITES" onClick={() => handleMenuClick('Custom/TramitsCustom')} />
                <MenuItem title="CALENDARIO" onClick={() => handleMenuClick('Calendar')} />

            </MenuSection>
            <MenuSection>
                <MenuItem title="PERFIL" onClick={() => handleMenuClick('/perfil')} />
                <MenuItem title="LOGOUT" onClick={() => handleMenuClick('/logout')} />
            </MenuSection>
        </MenuContainer>
    );
};

export default Menu;
