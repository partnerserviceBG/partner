import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { House } from '@models/House.ts';
import { environments } from '@environments/environments.ts';

export const meteringDevicesApi = createApi({
  reducerPath: 'meteringDevicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['MeteringDevices'],
  endpoints: (build) => ({
    getMeteringDevices: build.query<House[], void>({
      query: () => 'metering-devices',
      providesTags: () => ['MeteringDevices'],
    }),
    getMeteringDevice: build.query<House, string | undefined>({
      query: (id) => `metering-devices/${id}`,
      transformResponse: (data: House[]) => {
        const [house] = data;
        return house;
      },
      providesTags: () => [{ type: 'MeteringDevices' }],
    }),
  }),
});

export const { useGetMeteringDeviceQuery, useGetMeteringDevicesQuery } = meteringDevicesApi;
