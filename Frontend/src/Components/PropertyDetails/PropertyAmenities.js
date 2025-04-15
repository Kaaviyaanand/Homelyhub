import React from 'react'

const PropertyAmenities = ({amenities}) => {
  return (<>
   <h2 className="property-amenities"> what this place offers</h2>
   <div className="amenities">
     {amenities.map((amenities,index) =>(
        <p key={index}>
            <span className="material-symbols-outlined">{amenities.icon}</span>
            <span>{amenities.name}</span>
        </p>
     ))};
   </div>
  </>
  )
}

export default PropertyAmenities