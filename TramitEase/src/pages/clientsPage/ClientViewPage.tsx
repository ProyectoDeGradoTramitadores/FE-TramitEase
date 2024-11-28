import React from 'react';
import ReportsClientPage from '../clientFolderPage/ReportsClientPage.tsx';
import TabsScrollable from '../../shared/components/Tabs/TabsScrollable.tsx';
import ClientInfoView from '../../features/Client/ClientInfoView.tsx';

const ClientViewPage: React.FC = () => {
    const tabData = [
        { label: 'Informacion del cliente', value: 0, content:<ClientInfoView/>},
        { label: 'Reportes de las carpetas del cliente', value: 1, content: <ReportsClientPage /> },
    ];

    return (
        <div style={{marginTop: '190px', width:"100%"}}>
            <TabsScrollable tabs={tabData}/>
        </div>
    );
};

export default ClientViewPage;
