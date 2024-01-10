import { InfoFields } from '@models/InfoFields.ts';

export interface OrganisationInfo {
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
}
