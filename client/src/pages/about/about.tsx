import { FC, ReactNode } from 'react';
import { useGetOrganisationInfoQuery } from '@services/organisation-info.service.ts';

export const About: FC = (): ReactNode => {
  const { data } = useGetOrganisationInfoQuery();
  if (data) {
    const { info, license, operatingMode } = data;
    console.log(info);
    console.log(license);
    console.log(operatingMode);
  }

  return <div>Страницы в разработке...</div>;
};
