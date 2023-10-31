import React from "react";
interface FilterButtonProps {
  classname?: string
  label: any
  onclick?: Function
}
function FilterButton({ classname, label, onclick = () => { } }: FilterButtonProps) {
  return <div className={`flex items-center justify-center search-filter-item capitalize ${classname}`}
    onClick={() => {
      if (onclick)
        onclick()
    }}
  >{label}</div>;
}

export default FilterButton;
