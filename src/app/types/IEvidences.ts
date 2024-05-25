export interface IEvidenceType
{
    id : string;
    evidenceTypeName: string;
}

export interface IEvidence
{
    id: string;
    evidenceTypeId: string;
    vehicleViolationId: string;
    description: string;
    createdAt: string;
}

export interface IComment
{
    id: string;
    commentText: string;
    parentCommentId: string;
    accountId: string;
    vehicleViolationId: string;
}