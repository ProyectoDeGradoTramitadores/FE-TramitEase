import React from 'react';
import { IDS } from '../../shared/constants/routes.ts';
import ReportsClientPage from '../clientFolderPage/ReportsClientPage.tsx';
import TabsScrollable from '../../shared/components/Tabs/TabsScrollable.tsx';
import ClientInfoView from '../../features/Client/ClientInfoView.tsx';

const ClientViewPage: React.FC = () => {
    const idClient = IDS().CLIENT_ID

    const tabData = [
        { label: 'Informacion del cliente', value: 0, content:<ClientInfoView/>},
        { label: 'Reportes de las carpetas del cliente', value: 1, content: <ReportsClientPage /> },
    ];

    return (
        <div style={{marginTop: '190px'}}>
            <TabsScrollable tabs={tabData}/>
        </div>
    );
};

export default ClientViewPage;
