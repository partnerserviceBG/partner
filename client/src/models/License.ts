import { InfoFields } from '@models/InfoFields.ts';

export type License = {
  [key: string]: InfoFields;
  licenseNumber: InfoFields;
  licenseDate: InfoFields;
  authorityLicense: InfoFields;
  licenseDocument: InfoFields;
} & {
  id: number;
};
