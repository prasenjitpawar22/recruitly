export interface CompanyData {
    data: Company[];
    message: string;
    success: boolean;
    totalCount: number;
    totalValue: number;
}

export interface Company {
    additionalParams: AdditionalParams;
    analytics: Analytics;
    apolloRecord: ApolloRecord;
    benefitsPackage: string;
    client: boolean;
    companySizeCode: string;
    companyTypeId: string;
    createdBySystem: boolean;
    createdOn: string;
    description: string;
    distributionListId: string;
    domain: string;
    email: string;
    employees: string;
    facebook: string;
    faxNo: string;
    headOffice: Office;
    id: string;
    imageUrl: string;
    industries: Industry[];
    labels: Label[];
    languages: string[];
    linkedIn: string;
    logoUrl: string;
    modifiedOn: string;
    name: string;
    openJobs: boolean;
    otherOffices: Office[];
    ownerId: string;
    ownerName: string;
    parent: Parent;
    phone: string;
    placements: boolean;
    rating: number;
    reference: string;
    sectors: Sector[];
    skills: string[];
    status: Status;
    statusId: string;
    tags: Tag[];
    termsAgreed: string;
    twitter: string;
    type: string;
    udfList: UDFList[];
    website: string;
}

export interface AdditionalParams {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

export interface Analytics {
    avgCVSentToInterviewDays: number;
    avgClientRejectRate: number;
    avgInterviewToOfferDays: number;
    avgInterviewToOfferPct: number;
    avgInterviewToOfferRatio: string;
    avgJobCreatedToApplicationDays: number;
    avgJobCreatedToShortlistDays: number;
    avgJobCreatedToSourcedDays: number;
    avgOfferToPlacementDays: number;
    avgOfferToPlacementPct: number;
    avgOfferToPlacementRatio: string;
    avgPlacementValue: number;
    avgTimeToFillAllTime: number;
    avgTimeToFillCurrYear: number;
    avgTimeToFillPrevYear: number;
    billingCurrMonth: number;
    billingCurrQrtr: number;
    billingCurrYear: number;
    billingPrevMonth: number;
    billingPrevQrtr: number;
    billingPrevYear: number;
    closedJobsPipelineValue: number;
    jobsCurrMonth: number;
    jobsCurrQrtr: number;
    jobsCurrYear: number;
    jobsPrevMonth: number;
    jobsPrevQrtr: number;
    jobsPrevYear: number;
    lostOpportunityValue: number;
    openJobsCount: number;
    openJobsPipelineValue: number;
    openOpportunities: number;
    opportunitiesCurrMonth: number;
    opportunitiesCurrQrtr: number;
    opportunitiesCurrYear: number;
    opportunitiesPrevMonth: number;
    opportunitiesPrevQrtr: number;
    opportunitiesPrevYear: number;
    opportunityDealValue: number;
    opportunityValueCurrMonth: number;
    opportunityValueCurrQrtr: number;
    opportunityValueCurrYear: number;
    opportunityValuePrevMonth: number;
    opportunityValuePrevQrtr: number;
    opportunityValuePrevYear: number;
    pendingPositionsToFill: number;
    placementsCurrMonth: number;
    placementsCurrQrtr: number;
    placementsCurrYear: number;
    placementsPrevMonth: number;
    placementsPrevQrtr: number;
    placementsPrevYear: number;
    totalBillingValue: number;
    totalContacts: number;
    totalJobs: number;
    totalOpportunities: number;
    totalPlacements: number;
    totalPositionsToFill: number;
}

export interface ApolloRecord {
    accountId: string;
    createdOn: string;
    emailStatus: string;
    enableSync: boolean;
    enrichedByEmail: string;
    enrichedById: string;
    enrichedOn: string;
    lastSyncOn: string;
    organizationId: string;
    peopleId: string;
    personId: string;
    recordId: string;
    recordType: string;
    syncEnabledByEmail: string;
    syncEnabledById: string;
    syncEnabledOn: string;
}

export interface Office {
    address: Address;
    id: string;
    name: string;
}

export interface Address {
    addressLabel: string;
    addressLine: string;
    addressLine2: string;
    cityName: string;
    cityOrRegionAndPostCode: string;
    cityRegion: string;
    country: string;
    countryCode: string;
    countryName: string;
    hasCity: boolean;
    hasCityOrRegion: boolean;
    hasCountry: boolean;
    hasPostcode: boolean;
    hasRegion: boolean;
    hasValidGeo: boolean;
    latitude: number;
    longitude: number;
    postCode: string;
    regionName: string;
}

export interface Industry {
    category: string;
    createdBy: string;
    id: string;
    name: string;
    position: number;
    tenantId: string;
    type: IndustryType;
}

export interface IndustryType {
    code: string;
    id: string;
    name: string;
}

export interface Label {
    bgColor: string;
    filterId: string;
    id: string;
    name: string;
    parentLabelId: string;
    parentLabelName: string;
    position: number;
    shared: boolean;
    textColor: string;
    type: string;
}

export interface Parent {
    address: Address;
    alternateEmail: string;
    cvId: string;
    doNotContact: boolean;
    email: string;
    employerName: string;
    hasCv: boolean;
    headline: string;
    homePhone: string;
    id: string;
    initials: string;
    label: string;
    labels: Label[];
    mobile: string;
    ownerId: string;
    ownerName: string;
    rating: number;
    recordType: string;
    reference: string;
    tenantId: string;
    tenantName: string;
    website: string;
    workPhone: string;
}

export interface Sector {
    category: string;
    createdBy: string;
    id: string;
    name: string;
    position: number;
    tenantId: string;
    type: IndustryType;
}

export interface Status {
    category: string;
    createdBy: string;
    id: string;
    name: string;
    position: number;
    tenantId: string;
    type: IndustryType;
}

export interface Tag {
    key: string;
    value: string;
}

export interface UDFList {
    key: UDFKey;
    value: UDFValue;
}

export interface UDFKey {
    id: string;
    inputType: string;
}

export interface UDFValue {
    dateValue: string;
    listValue: string[];
    textValue: string;
}


