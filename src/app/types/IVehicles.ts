export interface IVehicle{
    id: string;
    vehicleTypeId: string;
    color: string;
    regNr: string;
    rating: number;
}
export interface IVehicleType{
    id: string;
    vehicleTypeName:string;
    make: string;
    model: string;
}

export interface IAdditionalVehicle{
    id: string;
    vehicleId: string;
    vehicleViolationId: string;
}

