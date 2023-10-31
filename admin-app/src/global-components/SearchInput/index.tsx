import { sanitizerInput } from "../../utilities/functions";
import React from "react";

import { Search } from 'react-feather'
interface SearchInputProps {
  placeholder?: string
  width?: any
  handleChange: Function
  handleFocus?: Function
  iconPosition?: string
  value?: string
  className?:string
}
function SearchInput({ width, placeholder = 'Search', handleChange, iconPosition = 'left', handleFocus, value, className="" }: SearchInputProps) {
  return <div className={`table-search-input table-search-input-mobile ${className}`} style={{ width: width ?? '' }} >
    {iconPosition == 'left' && <Search size={20} color="#64748B" />}
    <input placeholder={placeholder} onChange={(event) => handleChange(sanitizerInput(event.target.value))} onFocus={(event) => handleFocus && handleFocus(event)} value={value} />
    {iconPosition == 'right' && <Search size={20} color="#64748B" />}
  </div>;
}

export default SearchInput;
