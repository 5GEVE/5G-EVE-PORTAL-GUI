import { Execution } from './execution';
import {SapInfo} from './sapInfo';

export class ExperimentInfo {
    experimentId: string;
    tenantId: string;
    status: string;
    experimentDescriptorId: string;
    lcTicketId: string;
    openTicketIds: string[];
    targetSites: string[];
    timeslot: {
        startTime: string;
        stopTime: string;
    };
    nfvNsInstanceId: string;
    name: string;
    sapInfos: SapInfo[];
    executions: Execution[];
    useCase: string;
}
