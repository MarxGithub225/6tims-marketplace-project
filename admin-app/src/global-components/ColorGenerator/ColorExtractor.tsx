import React, { useState, useEffect } from 'react';
import ColorThief from "colorthief";
import { SecondaryColorGenerator } from './SecondaryColorGenerator';
import chroma from 'chroma-js';
import {ReactComponent as CheckCaret} from "../../assets/icons/Trash.svg";
import { rgbToHex } from '../../utilities/functions';

interface selectedPaletteProps {
    index: number
    main: string,
    secondary: string
}
interface ColorExtractorProps {
    imageUrl: string
    selectedPalette: selectedPaletteProps
    setSelectedPalette: Function
}

function ColorExtractor({ imageUrl, selectedPalette, setSelectedPalette }: ColorExtractorProps) {
    const [imageColors, setImageColors] = useState<Array<any>>([]);
    const [luminances, setLuminances] = useState<Array<any>>([]); //main color luminance

    useEffect(() => {
        if (imageUrl) {
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                const colorThief = new ColorThief();
                const colors = colorThief.getPalette(image, 3);
                setImageColors(colors);

                const luminanceValues = colors.map((color: string) => {
                    const rgbValue = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    const chromaColor = chroma(rgbValue);
                    return chromaColor.luminance();
                });

                setLuminances(luminanceValues);
            };
        }
    }, [imageUrl]);

    return (
        <div>
            {imageColors.length > 0 && (
                <div className='flex flex-row'>
                    {imageColors.map((color, index) => {
                        const luminance = (luminances[index].toFixed(2))
                        const newLuminance = 0.95 - luminance
                        const secondaryColor = SecondaryColorGenerator(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, newLuminance);
                        return (
                            <div className="palette-card relative cursor-pointer"
                                onClick={() => setSelectedPalette(
                                    {
                                        index,
                                        main: rgbToHex(color[0], color[1], color[2]),
                                        secondary: rgbToHex(secondaryColor[0], secondaryColor[1], secondaryColor[2])
                                    })}
                            >
                                <div className="palette-card-item-label">Palette {index + 1}</div>
                                <div className='flex flex-row'>
                                    <div style={{
                                        width: 80,
                                        height: 60,
                                        borderRadius: 8,
                                        backgroundColor: rgbToHex(color[0], color[1], color[2]),
                                        marginRight: 8
                                    }}
                                    />
                                    <div style={{
                                        width: 80,
                                        height: 60,
                                        borderRadius: 8,
                                        backgroundColor: rgbToHex(secondaryColor[0], secondaryColor[1], secondaryColor[2]),
                                    }} />
                                    {selectedPalette?.index === index && <CheckCaret className="w-5 h-auto absolute top-1 right-2" />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}

export default ColorExtractor;