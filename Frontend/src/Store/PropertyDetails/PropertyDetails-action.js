import axios from "axios";

import { propertyDetailsAction } from "./PropertyDetails-slice";

export const getPropertyDetails=(id)=>async(dispatch)=>{
    try{
    dispatch(propertyDetailsAction.getListRequest());
     const response=await axios(`https://backennnd-1.onrender.com/api/v1/rent/listing/${id}`);
     if(! response){
        throw new Error("could not fetch any property details")
     }
     const {data}=response.data;
     dispatch(propertyDetailsAction.getPropertyDetails(data));
    
} catch(error){
    dispatch(propertyDetailsAction.getErrors(error.response.data.error));
}
};

