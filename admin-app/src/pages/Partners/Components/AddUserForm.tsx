/* eslint-disable jsx-a11y/img-redundant-alt */
import CustomModal from '../../../global-components/CustomModal';
import CustomSelect from '../../../global-components/CustomSelect/CustomSelect';
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from '../../../global-components/CustomButton';
import { AdminRoles } from '../../../sdks/user-v1/utils/DataSchemas';

import AsyncSelect from "react-select/async";
import { SingleValue } from 'react-select';
import { Seller } from '../../../sdks/seller-v1/utils/DataSchemas';
import useSeller from '../../../hooks/useSeller';
import { Pagination } from '../../../sdks/GlobalDataSchemas';
import { Search, X } from 'react-feather';
import { ScaleLoader } from 'react-spinners';
interface AddUserFormProps {
    modalOpened: boolean
    toggleModal: () => void
    upsertSetting: Function
    currentSetting: any
    setCurrentSetting: Function
    loading: boolean
}

const defaultValue: any = {
    sellerId: "",
    suspended: false
}
let timer: ReturnType<typeof setTimeout>;
function AddUserForm({ modalOpened, toggleModal,  upsertSetting, currentSetting, setCurrentSetting, loading }: AddUserFormProps) {
    const {client} = useSeller();
    const [seller, setSeller] = useState<Seller | null>()

    const handleInputChange = (newValue: string) => {
        return newValue;
    };

    const handleChange = (selectedOption: any) => {
        const location: Seller | null = selectedOption ? selectedOption.value : null;
        if (selectedOption) {
            setSeller(location)
            setCurrentSetting({...currentSetting, sellerId: location?._id})
        }
    };

    const handleLoadOptions = (inputValue: string, callback: Function) => {

        if (inputValue?.length >= 2) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                let result: Pagination<Seller> = await client.getSellers({limit: 100, page: 1, filter: inputValue, fields: 'personnalInfo.fullName,companyInfo.companyName,email,locationInfo.cityName', verified_only: 'true'})
                callback(result.docs?.map((seller: Seller) => ({
                    label: seller.companyInfo.companyName,
                    value: seller
                })));
            }, 300);
        }
    };


    useEffect(() => {   
        if(currentSetting?.seller) {
            setSeller(currentSetting?.seller)
        }
    }, [currentSetting?.seller])
    return (
        <CustomModal
            open={modalOpened}
            toggle={toggleModal}
            className="user-add"
        >
            <div className="px-12 py-7 no-scrollbar w-full"
            >
                <div className="modal-label">Add partner information</div>
                <form className="m" id='user-form'>
                    <div className="relative status-filter-async-select status-filter-async-select-blank">
                        <AsyncSelect
                            value={seller ? { label: seller?.companyInfo.companyName, value: seller?._id } : null}
                            isClearable={true}
                            placeholder={"Link a seller"}
                            className="react-select"
                            classNamePrefix="select"
                            name="organisation-react-select"
                            loadOptions={handleLoadOptions}
                            onInputChange={handleInputChange}
                            onChange={handleChange}
                            defaultOptions={true}
                        />
                        <div className="absolute top-3 right-3">
                            {!seller ? <Search size={20} className="ml-2 search-svg-option" color="#64748B" />
                                : <X size={20} className="ml-2 search-svg-option" color="#64748B"
                                    onClick={() => {
                                        setSeller(null)
                                    }}
                                />
                            }
                        </div>
                    </div>
                    
                    <div className='mt-10'>

                        <div className="custom-input-check">
                            <label className={`option capitalize`}>
                                {`${currentSetting?.suspended ? 'Suspendu' : 'Pas suspendu'}`}
                                <input
                                    type="checkbox"
                                    checked={currentSetting?.suspended}
                                    value={currentSetting?.suspended}
                                    onChange={() => setCurrentSetting({ ...currentSetting, suspended: !currentSetting?.suspended})}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <div className="flex justify-end w-full mt-10">
                            <div className="flex item-center space-x-3 actions-buttons">
                                <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                    onClick={() => {setCurrentSetting(defaultValue) ; toggleModal()}}
                                >Cancel</div>
                                <div className={`flex items-center justify-center actions-buttons-submit cursor-pointer`}
                                style={!currentSetting?.sellerId?.trim() ? {
                                    backgroundColor: "#bdbdbd",
                                    cursor: "not-allowed"
                                } : {}}
                                onClick={() => {
                                    currentSetting?.sellerId?.trim() && !loading && upsertSetting()
                                }}
                                >{loading ?
                                    <ScaleLoader width={3} height={20} color="white" />
                                    : (currentSetting?._id ? 'Edit' : 'Create')}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </CustomModal >
    )
}

export default AddUserForm