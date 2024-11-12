import * as React from 'react';

export interface TabContentProps {
    label: string;
    value: number;
    content: React.ReactNode;
}

export interface TabsScrollableProps {
    tabs: TabContentProps[];
}
