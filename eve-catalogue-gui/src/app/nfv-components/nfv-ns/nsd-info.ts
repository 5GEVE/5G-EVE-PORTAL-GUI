export class NsdInfo {
    id: string;
	nsdId: string;
	nsdName: string;
	nsdVersion: string;
	nsdDesigner: string;
    nsdInvariantId: string;
	vnfPkgIds: string[];
	pnfdInfoIds: string[];
	nestedNsdInfoIds: string[];
	nsdOnboardingState: string;
	onboardingFailureDetails: Object;
	nsdOperationalState: string;
	nsdUsageState: string;
	userDefinedData: Map<string, string>;
	_links: {
		self: string;
		nsd_content: string;
	};
	manosOnboardingStatus: Map<string, string>;
	c2cOnboardingState: string;
	projectId: string;
}