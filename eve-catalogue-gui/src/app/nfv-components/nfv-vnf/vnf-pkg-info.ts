export class VnfPkgInfo {
    id: string;
	vnfdId: string;
	vnfProvider: string;
	vnfProductName: string;
	vnfSoftwareVersion: string;
	vnfdVersion: string;
	checksum: string;
	softwareImages: string;
	additionalArtifacts: string;
	onboardingState: string;
	operationalState: string;
	usageState: string;
	userDefinedData: Map<string, string>;
	_links: {
		self: string;
		vnfd: string;
		packageContent: string;
	};
	manosOnboardingStatus: Map<string, string>;
	c2cOnboardingState: string;
	projectId: string;
}