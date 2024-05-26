export interface IViolation{
    id?: string;
    violationType: number;
    violationName: string;
    severity: number;
}

export interface IVehicleViolation{
    id?: string;
    vehicleId: string;
    violationId: string;
    appUserId: string;
    description: string;
    coordinates: string;
    locationName: string;
    createdAt: string;

}
