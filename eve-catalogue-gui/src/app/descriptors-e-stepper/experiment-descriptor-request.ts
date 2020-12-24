import { VsDescriptorInfo } from "../descriptors-vs/vs-descriptor-info";

export class ExperimentDescriptorRequest {
  version: string;
  experimentBlueprintId: string;
  vsDescriptor: VsDescriptorInfo = new VsDescriptorInfo();
  contextDetails: object[] = [];
  testCaseConfiguration: object[] = [];
  kpiThresholds = {};
  name: string;
  tenantId: string;
}
