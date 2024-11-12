import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { TabsScrollableProps } from '../../types/TabProps.ts';

const TabsScrollable: React.FC<TabsScrollableProps> = ({ tabs }) => {
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    return (
        <div>
            <Tabs
                aria-label="Scrollable tabs"
                value={selectedTab}
                onChange={(_event, newValue) =>
                    setSelectedTab(parseInt(newValue as string) || 0)
                }
                sx={{ width: '100%', display: 'flex', flexDirection: 'column', padding:'10px 0 0 0' }}
            >
                <TabList
                    sx={{
                        overflow: 'auto',
                        scrollSnapType: 'x mandatory',
                        display: 'flex',
                        justifyContent: 'center',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.value}
                            sx={{
                                flex: 'none',
                                scrollSnapAlign: 'start',
                                color: selectedTab === tab.value ? 'blacke' : 'inherit',
                            }}
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </TabList>

                {tabs.map((tab) => (
                    <TabPanel key={tab.value} value={tab.value} sx={{ padding: 2 }}>
                        {tab.content}
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default TabsScrollable;
