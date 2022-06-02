import axios from "axios";

const postAPI : any = axios.create({
    baseURL:"https://httpstat.us/200",
}); 

export const postVehicleDetails:any = (currentVehicle:any) =>{
    const data = JSON.stringify({vehicle_details: currentVehicle})
    postAPI.post("/vehicle_details",data)
}