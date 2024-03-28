import { InfoFields } from '@models/InfoFields.ts';

export type OrganisationInfo = {
  [key: string]: InfoFields;
  nameOfCompany: InfoFields;
  organizationalAndLegalForm: InfoFields;
  OGRN: InfoFields;
  TIN: InfoFields;
  placeOfStateRegistration: InfoFields;
  email: InfoFields;
  contactPhoneNumber: InfoFields;
  fax: InfoFields;
  mailingAddress: InfoFields;
  locationOfControls: InfoFields;
  dispatcherContacts: InfoFields;
} & {
  id: number;
};
