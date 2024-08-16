import React from 'react';

export interface BreadcrumbsProps {
    text: string,
    linkRef?: string;
}

export interface BreadcrumbProps {
    breadCrumbs: React.ReactNode[];
}
