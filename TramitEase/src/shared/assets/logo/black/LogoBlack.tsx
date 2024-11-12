import React from "react";
import TlogoBlack from "./TlogoBlack.tsx";
import { CommonProps } from "../../../common/types.ts";
import {sizeToFontLogo} from "../../../constants/typography.ts";
import {sizeToSVGDimensions} from "../../../constants/logo.ts";

const LogoBlack: React.FC<CommonProps> = ({ size, onClick }) => {
    const fontSize = size && sizeToFontLogo[size as keyof typeof sizeToFontLogo] || 60;
    const svgDimensions = size && sizeToSVGDimensions[size as keyof typeof sizeToSVGDimensions];
    return (
        <svg  onClick={onClick} width={svgDimensions.width}  height={svgDimensions.height} viewBox={`0 0 ${svgDimensions.width} 
        ${svgDimensions.height}`} xmlns="http://www.w3.org/2000/svg">
            <defs>s
                <linearGradient id="gradText1" x1="10%" y1="50%" x2="100%" y2="51%">
                    <stop offset="31%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                    <stop offset="72%" style={{ stopColor: '#666666', stopOpacity: 1 }} />
                </linearGradient>

                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="-2" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
                </filter>
            </defs>

            <g filter="url(#dropShadow)">
                <TlogoBlack size={size} color="primary" onClick={() => alert('Button clicked!')} />

                <text x={svgDimensions.firstX}  y={svgDimensions.firstY} fontFamily="JejuMyeongjo" fontSize={fontSize}
                      fontWeight="normal" fill="url(#gradText1)" filter="url(#dropShadow)">
                    ramit
                </text>
                <text x={svgDimensions.secondX} y={svgDimensions.secondY} fontFamily="JejuMyeongjo" fontSize={fontSize}
                      fontWeight="normal" fill="url(#gradText1)" filter="url(#dropShadow)">
                    ease
                </text>
            </g>
        </svg>
    );
};

export default LogoBlack;
