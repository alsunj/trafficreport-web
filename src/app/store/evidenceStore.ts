import type { IComment } from "../types/IEvidences";
import type { IEvidenceType } from "../types/IEvidences";
import type { IEvidence } from "../types/IEvidences";
import { createContext } from 'react';

export interface EvidenceContextProps{
    evidences: IEvidence[] | null;
    evidenceTypes: IEvidenceType[] | null;
    comments : IComment[] | null;
    setComments:(( comments : IComment[])=> void) | null;
    setEvidences:((  evidences: IEvidence[])=> void)| null;
    setEvidenceTypes: ((evidenceTypes: IEvidenceType[]) => void) | null;}

export const EvidenceContext = createContext<EvidenceContextProps>({
    evidences: null,
    evidenceTypes: null,
    comments : null,
    setComments: null,
    setEvidences: null,
    setEvidenceTypes: null,

})