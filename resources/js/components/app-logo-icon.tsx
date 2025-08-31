import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
            <defs>
                <style>
                    {`@font-face {
                        font-family: 'Fascinate';
                        font-style: normal;
                        font-weight: 400;
                        src: url(/Fascinate/Fascinate-Regular.ttf) format('truetype');
                    }`}
                </style>
            </defs>
            <text
                x="50"
                y="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="currentStroke"
                fontSize="125"
                fontFamily="Fascinate, cursive"
                textAnchor="middle"
                dominantBaseline="central"
            >
                A
            </text>
        </svg>
    );
}
