import * as React from 'react';
import { TabPanel } from '@mui/joy';
import { TabContentProps } from '../../types/TabProps.ts';

const TabContent: React.FC<TabContentProps> = ({ value, content }) => {
    return (
        <TabPanel value={value}>
            {content}
        </TabPanel>
    );
};

export default TabContent;
