import React from 'react';
import { MenuContainer, MenuSection } from './Menu.styles.ts';
import MenuItem from './MenuItem.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase/firebaseService.ts';

const Menu: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleMenuClick = (path: string) => {
        if (path === 'logout') {
            signOut(auth)
                .then(() => navigate('/TramitEase/login'))
                .catch((error) => console.error("Logout failed: ", error));
        } else {
            navigate(`/TramitEase/Tramitador/${id}/${path}`);
        }
    };

    return (
        <MenuContainer>
            <MenuSection>
                <MenuItem title="CARPETAS" onClick={() => handleMenuClick('ClientsFolder')} />
                <MenuItem title="PLANTILLAS DE TRAMITES" onClick={() => handleMenuClick('Custom/TramitsCustom')} />
                <MenuItem title="CALENDARIO" onClick={() => handleMenuClick('Calendar')} />
                <MenuItem title="REPORTES" onClick={() => handleMenuClick('reports')} />
            </MenuSection>
            <MenuSection>
                <MenuItem title="PERFIL" onClick={() => handleMenuClick('perfil')} />
                <MenuItem title="LOGOUT" onClick={() => handleMenuClick('logout')} />
            </MenuSection>
        </MenuContainer>
    );
};

export default Menu;
