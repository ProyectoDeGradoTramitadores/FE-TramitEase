import React, { useEffect, useState } from 'react';
import AccountProfile from '../../features/AccountProfile/AccountProfile.tsx';
import { Tramitador } from '../../entities/Tramitador.ts';
import { useTramitadores } from '../../shared/hooks/useTramitadores.ts';
import { IDS } from '../../shared/constants/routes.ts';

const UserProfile: React.FC = () => {
    const idTramitador = IDS().TRAMITADOR_ID;
    const { fetchTramitadorById } = useTramitadores();
    const [tramitador, setTramitador] = useState<Tramitador | null>(null);

    useEffect(() => {
        const getTramitador = async () => {
            try {
                const fetchedTramitador = await fetchTramitadorById(Number(idTramitador));
                setTramitador(fetchedTramitador ?? null);
            } catch (error) {
                console.error('Error fetching tramitador:', error);
            }
        };

        getTramitador();
    }, [idTramitador]);

    if (!tramitador) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AccountProfile tramitador={tramitador} />
        </div>
    );
};

export default UserProfile;
