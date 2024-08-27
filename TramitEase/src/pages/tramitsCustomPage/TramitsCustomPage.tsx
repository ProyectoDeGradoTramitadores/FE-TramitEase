import React  from 'react';
import TabsScrollable from '../../shared/components/Tabs/TabsScrollable.tsx';
import TramitsViewPage from './TramitsViewPage.tsx';
import ProceduresViewPage from './ProceduresViewPage.tsx';
import TypeViewPage from './TypeViewPage.tsx';


const TramitsCustomPage: React.FC = () => {
    const tabData = [
        { label: 'Tramites', value: 0, content:<TramitsViewPage/>},
        { label: 'Procedimientos', value: 1, content: <ProceduresViewPage /> },
        { label: 'Tipos de Tramites', value: 2, content: <TypeViewPage /> },
    ];

    return (
        <div style={{marginTop: '190px'}}>
            <TabsScrollable tabs={tabData}/>
        </div>
    );
};

export default TramitsCustomPage;
