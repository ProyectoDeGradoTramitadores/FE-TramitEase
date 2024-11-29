import React from 'react';
import AccountProfile from '../../features/AccountProfile/AccountProfile.tsx';
import { IDS } from '../../shared/constants/routes.ts';

const UserProfile: React.FC = () => {
    const idTramitador = IDS().TRAMITADOR_ID;

    return (
        <div>
            <AccountProfile userProfileId={Number(idTramitador)} />
        </div>
    );
};

export default UserProfile;
