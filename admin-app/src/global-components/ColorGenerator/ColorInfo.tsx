import React from 'react';
import chroma from 'chroma-js';

interface ColorInfoProps {
    rgbValue: string
}

function ColorInfo({ rgbValue }: ColorInfoProps) {
    const color = chroma(rgbValue);
    const luminance = color.luminance();
    const saturation = color.get('hsl.s');
    return (
        <div>
            <p>RVB : {rgbValue}</p>
            <p>Luminance : {luminance.toFixed(2)}</p>
            <p>Saturation : {saturation.toFixed(2)}</p>
        </div>
    );
}

export default ColorInfo;