import { InfoFields } from '@models/InfoFields.ts';

export interface License {
  id: number;
  licenseNumber: InfoFields;
  licenseDate: InfoFields;
  authorityLicense: InfoFields;
  licenseDocument: InfoFields;
}
