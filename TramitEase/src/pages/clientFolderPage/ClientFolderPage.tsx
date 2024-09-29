import React  from 'react';
import TabsScrollable from '../../shared/components/Tabs/TabsScrollable.tsx';
import InfoClientPage from './InfoClientPage.tsx';
import ProgressClientPage from './ProgressClientPage.tsx';
import ReportsClientPage from './ReportsClientPage.tsx';


const ClientFolderPage: React.FC = () => {
    const tabData = [
        { label: 'Informacion de la carpeta del cliente', value: 0, content:<InfoClientPage/>},
        { label: 'Progreso de la carpeta del cliente', value: 1, content: <ProgressClientPage /> },
        { label: 'Reportes de la carpeta del cliente', value: 2, content: <ReportsClientPage /> },
    ];

    return (
        <div style={{marginTop: '190px'}}>
            <TabsScrollable tabs={tabData}/>
        </div>
    );
};

export default ClientFolderPage;
