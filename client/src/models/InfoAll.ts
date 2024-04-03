import { InfoFields } from '@models/InfoFields.ts';
import { OrganisationInfo } from '@models/OrganisationInfo.ts';
import { License } from '@models/License.ts';
import { ScheduleCompany } from '@models/ScheduleCompany.ts';

export type InfoAll = {
  [key: string]: InfoFields;
} & {
  info: OrganisationInfo;
  license: License;
  schedule: ScheduleCompany;
};
