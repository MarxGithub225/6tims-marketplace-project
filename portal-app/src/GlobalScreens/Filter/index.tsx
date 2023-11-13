/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Category1 } from "../../sdks/category-v1/utils/DataSchemas";
import { API_FILE_URL } from "../../utilities/constants";
interface FilterProps {
  categories: Array<Category1>

  setSelectedCategory: Function
  selectedCategory: string | null

  filterPrice: string | null
  setFilterPrice: Function

  sortBy: string | null
  setSortBy: Function

  sortLabel: string | null
  setSortLabel: Function
}
function Filter({
  categories, 
  setSelectedCategory, 
  selectedCategory,
  filterPrice,
  setFilterPrice,
  sortBy,
  setSortBy,
  sortLabel,
  setSortLabel
}: FilterProps) {
  return <div className="tf-soft">
  <div className="soft-left">
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="white" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="white" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="white" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="white" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
        </svg>                                        
        <span className="inner">Categorie</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#"
        onClick={(e: any) => {
          e.preventDefault()
          setSelectedCategory(null)
        }}
        >
          <div className={`sort-filter ${!selectedCategory ? 'active': ''} `}>
            <span className="flex items-center"><img src="assets/images/icon/menu.png" alt='' className="mr-2"/> All</span>
            {!selectedCategory && <i className="fal fa-check" />}
          </div>
        </a>
        {categories.map((data: any, key: number) => {
          return <a key={key} 
          onClick={(e: any) => {
            e.preventDefault()
            setSelectedCategory(data?.category[0]._id)
          }}
          className="dropdown-item" href="#">
          <div className={`sort-filter ${selectedCategory === data?.category[0]._id ? 'active': ''} `}>
            <span className="flex items-center"><img src={`${API_FILE_URL}/categories/${data?.image[0]?.path}`} alt={`6tim - tims group | ${data?.category[0]?.label}`} className="mr-2 rounded-lg"/> {data?.category[0]?.label}</span>
            {selectedCategory === data?.category[0]._id && <i className="fal fa-check" />}
          </div>
        </a>
        })}
        
      </div>
    </div>
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> 
        <span className="inner">Fourchette de prix</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#"
        onClick={(e: any) => {
          e.preventDefault()
          setFilterPrice('asc')
        }}
        >
          <div className={`sort-filter ${filterPrice === 'asc' ? 'active': ''}`}>
            <span> Prix: Croissant</span>
            {filterPrice === 'asc' && <i className="fal fa-check" />}
          </div>
        </a>
        <a className="dropdown-item" href="#"
        onClick={(e: any) => {
          e.preventDefault()
          setFilterPrice('desc')
        }}
        >
        <div className={`sort-filter ${filterPrice === 'desc' ? 'active': ''}`}>
            <span> Prix: Décroissant</span>
            {filterPrice === 'desc' && <i className="fal fa-check" />}
          </div>
        </a>
      </div>
    </div>
  </div>
  <div className="soft-right">
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 12H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 17H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Filtrer {sortLabel ? `par: ${sortLabel}`: ''}</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <h6>Filtrer par</h6>
        <a href="#" className="dropdown-item"
        onClick={(e: any) => {
          e.preventDefault()
          setSortBy('new')
          setSortLabel('Plus récents')
        }}
        >
          <div className={`sort-filer ${sortBy === 'new' ? 'active': ''} `} >
            <span>Plus récents</span>
            {sortBy === 'new' && <i className="fal fa-check" />}
          </div>
        </a>
        
        <a href="#" className="dropdown-item"
        onClick={(e: any) => {
          e.preventDefault()
          setSortBy('purchaseCount')
          setSortLabel('Plus vendus')
        }}
        >
        <div className={`sort-filer ${sortBy === 'purchaseCount' ? 'active': ''} `} >
            <span>Plus vendus</span>
            {sortBy === 'purchaseCount' && <i className="fal fa-check" />}
          </div>
        </a>

        <a href="#" className="dropdown-item"
        onClick={(e: any) => {
          e.preventDefault()
          setSortBy('rating')
          setSortLabel('Note supérieur à 3')
        }}
        >
          <div className={`sort-filer ${sortBy === 'rating' ? 'active': ''} `} >
            <span>Note supérieur à 3</span>
            {sortBy === 'rating' && <i className="fal fa-check" />}
          </div>
        </a>
        
        <h6>Options</h6>
        <a href="#" className="dropdown-item"
        onClick={(e: any) => {
          e.preventDefault()
          setSortBy('isPromoted')
          setSortLabel('En promotion')
        }}
        >
          <div className="sort-filer" >
            <span>En promotion</span>
            <input className="check" type="checkbox" defaultValue="checkbox" name="check" checked={sortBy === 'isPromoted'} />
          </div>
        </a>
      </div>
    </div>
  </div>
</div>;
}

export default Filter;
