import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { License } from '@models/License.ts';
import { ScheduleCompany } from '@models/ScheduleCompany.ts';
import { OrganisationInfo } from '@models/OrganisationInfo.ts';
import { InfoAll } from '@models/InfoAll.ts';

export const organisationInfoApi = createApi({
  reducerPath: 'organisationInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['organisationInfo'],
  endpoints: (build) => ({
    getAllInfo: build.query<InfoAll[], void>({
      query: () => 'organisation-info',
      providesTags: () => ['organisationInfo'],
    }),
    getLicense: build.query<License, void>({
      query: () => 'organisation-info/license',
      providesTags: () => ['organisationInfo'],
      transformResponse: (data: License[]) => {
        const [license] = data;
        return license;
      },
    }),
    getInfo: build.query<OrganisationInfo, void>({
      query: () => 'organisation-info/info',
      providesTags: () => ['organisationInfo'],
      transformResponse: (data: OrganisationInfo[]) => {
        const [info] = data;
        return info;
      },
    }),
    getScheduleCompany: build.query<ScheduleCompany, void>({
      query: () => 'organisation-info/schedule',
      providesTags: () => ['organisationInfo'],
      transformResponse: (data: ScheduleCompany[]) => {
        const [schedule] = data;
        return schedule;
      },
    }),
  }),
});

export const { useGetAllInfoQuery, useGetLicenseQuery, useGetInfoQuery, useGetScheduleCompanyQuery } =
  organisationInfoApi;
