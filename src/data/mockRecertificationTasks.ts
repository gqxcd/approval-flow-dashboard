
export interface RecertificationTask {
  id: string;
  groupName: string;
  groupSummary: string;
  primaryOwner: string;
  secondaryOwner: string;
  groupClassification: string;
  primaryOwnerSupervisor: string;
  primaryOwnerCostCenter: string;
  primaryOwnerOfficeBuilding: string;
  primaryOwnerPhone: string;
  primaryOwnerSite: string;
  primaryOwnerCountry: string;
  suggestion: 'approval' | 'reject';
}

export const mockRecertificationTasks: RecertificationTask[] = [
  {
    id: "recert-001",
    groupName: "ADGRP1",
    groupSummary: "AD Group For cNote Access",
    primaryOwner: "BH0000000@devcorptenant.com",
    secondaryOwner: "G000000",
    groupClassification: "UAT",
    primaryOwnerSupervisor: "G0000000",
    primaryOwnerCostCenter: "[xxxx]",
    primaryOwnerOfficeBuilding: "300 Jefferson Park Whippany",
    primaryOwnerPhone: "201 499 5000",
    primaryOwnerSite: "NJ",
    primaryOwnerCountry: "USA",
    suggestion: 'approval'
  },
  {
    id: "recert-002",
    groupName: "ADGRP2",
    groupSummary: "AD Group For [xxxx] Access",
    primaryOwner: "BH0000000@devcorptenant.com",
    secondaryOwner: "G000000",
    groupClassification: "PROD",
    primaryOwnerSupervisor: "G0000000",
    primaryOwnerCostCenter: "12457",
    primaryOwnerOfficeBuilding: "Commerze-SEZ Pune",
    primaryOwnerPhone: "814 578 8788",
    primaryOwnerSite: "MH",
    primaryOwnerCountry: "IN",
    suggestion: 'reject'
  }
];

export const fetchRecertificationTasks = async (): Promise<RecertificationTask[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecertificationTasks);
    }, 500);
  });
};
