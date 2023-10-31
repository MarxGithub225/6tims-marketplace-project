import React, {useState} from "react";
import {ReactComponent as Loop} from "../../assets/icons/search-normal.svg";
import AsyncSelect from "react-select/async";
import {useQuery} from "@tanstack/react-query";
import {SingleValue} from "react-select";

interface CustomAsyncSelectProps {
    label?: string;
    placeholder?: string;
    width?: number;
    height?: number;
    onChange: (location: Location | null) => void;
}
const DEBOUNCE_DELAY = 300;

const LocationSelect: React.FC<CustomAsyncSelectProps> = ({label = "Location", placeholder = "Search location", width = 613, height = 72, onChange,}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<any | null>(
        null
    );

    const searchLocations = useQuery({
        queryKey: ["searchLocations", inputValue],
        queryFn: async () => {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&addressdetails=1`
            );
            return await response.json();
        }
    });
    let timer : ReturnType<typeof setTimeout>;

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
        return newValue;
    };

    const handleLocationChange = (selectedOption: SingleValue<{ label: string; value: any }>) => {
        const location = selectedOption ? selectedOption.value : null;
        setSelectedLocation(location);
        onChange(location);
    };
    const handleLoadOptions = (inputValue: string, callback: Function) => {
        if (inputValue?.length >= 2) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                callback(searchLocations.data?.map((location: any) => ({
                    label: location.display_name,
                    value: location
                })));
            }, DEBOUNCE_DELAY);
        }
    };

    return (
        <div className="w-full">
            <div
                className="relative custom-select custom-options-select"
                style={{width: width, height: height}}
            >
                <div className="flex flex-col">

                    {label && (
                        <span className="custom-select-label">
                              <span className="mr-1" style={{color: "#F4A607"}}>*</span>
                    {label}

                </span>)}
                </div>
                <AsyncSelect
                    value={selectedLocation ? {label: selectedLocation?.display_name, value: selectedLocation} : null}
                    isClearable={true}
                    placeholder={placeholder}
                    className="react-select"
                    classNamePrefix="select"
                    name="callback-react-select"
                    loadOptions={handleLoadOptions}
                    onInputChange={handleInputChange}
                    onChange={handleLocationChange}
                    defaultOptions={true}
                />

                <div className="absolute bottom-3 right-4">
                    <Loop className="search-svg-option w-4 h-auto"/>
                </div>
            </div>
        </div>
    );
};

export default LocationSelect;