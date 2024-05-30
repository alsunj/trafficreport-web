export interface IEvidenceType
{
    id?: string;
    evidenceTypeName: string;
}

export interface IEvidence
{
    id?: string;
    evidenceTypeId: string;
    vehicleViolationId: string;
    file?:string;
    description: string;
    createdAt?: string;
}

export interface IComment
{
    id?: string;
    commentText: string;
    parentCommentId: string | undefined;
    appUserId: string;
    vehicleViolationId: string;
    createdAt: string;
}