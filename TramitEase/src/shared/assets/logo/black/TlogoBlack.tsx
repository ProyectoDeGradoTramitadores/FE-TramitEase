import React from 'react';
import {CommonProps} from "../../../common/types.ts";
import {sizesLogoT} from "../../../constants/logo.ts";

const TlogoBlack: React.FC<CommonProps> = ({ size }) => {
    const { width, height } = sizesLogoT[size] || sizesLogoT['m'];

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad2" x1="0%" y1="10%" x2="90%" y2="10%">
                    <stop offset="0%" style={{stopColor: '#C2CBDC', stopOpacity: 1}}/>
                    <stop offset="100%" style={{stopColor: '#373A40', stopOpacity: 1}}/>
                </linearGradient>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="20%" style={{ stopColor: '#C2CBDC', stopOpacity: 1 }} />
                    <stop offset="73%" style={{ stopColor: '#373A40', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <rect x={width * 0.256} y="0" width={width * 0.32} height={height} fill="url(#grad2)" />
            <rect x={width * 0.015} y="0" width={width * 0.1} height={height * 0.2857} fill="#C2CBDC" />
            <rect x={width * 0.015} y="0" width={width * 0.7} height={height * 0.2429} fill="url(#grad1)" />
            <rect x={width * 0.675} y="0" width={width * 0.131} height={height * 0.2895} fill="#373A40" />
        </svg>
    );
};

export default TlogoBlack;
