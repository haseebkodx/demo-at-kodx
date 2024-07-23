import React from 'react'
import phoneFormat from '../../helpers/formatter/formatPhone'
import Information from '../commonComponents/InformationRow'
import './userProfile.scss'

const CompanyInformation = ({ 
    companyName, 
    primaryNaics, 
    physicalAddress, 
    electronicBusinessPOCDetails, 
    /* Edit Fields */
    isEditable,
    setPhysicalAddress,
    setElectronicBusinessPOCDetails,
}) => {

    /* Throw an error if editable but the setters are not */
    if(isEditable && (!setPhysicalAddress || !setElectronicBusinessPOCDetails)) {
        throw new Error('setPhysicalAddress and setElectronicBusinessPOCDetails are required when isEditable is true')
    }

    return (
        <div className="col-md-12">
            <div className="row mt-3">
                <div className="col-md-12">
                    <Information
                        label='Company Name'
                        detail={companyName}
                    />
                    <Information
                        label='Address'
                        detail={`${physicalAddress.addressLine1} ${physicalAddress.city} ${physicalAddress.stateOrProvinceCode} ${physicalAddress.zipCode}`}
                    />
                    {/* <Information
                        label='Phone'
                        detail={phoneFormat(physicalAddress.phone || electronicBusinessPOCDetails.usPhone) || '(Not Available)'}
                        isEditable={isEditable}
                        isPhone={true}
                        onEdit={(phone) => {
                                setPhysicalAddress({ ...physicalAddress , phone: phone, usPhone: phone })
                                setElectronicBusinessPOCDetails({ ...electronicBusinessPOCDetails, usPhone: phone })
                            }
                        }
                    /> */}
                    <Information
                        label='Primary NAICS'
                        detail={primaryNaics}
                    />
                </div>
            </div>
        </div>
    )
}

export default CompanyInformation