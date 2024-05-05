import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { MeteringDevice } from '@models/Rias-models/Metering-device/MeteringDevice.ts';

export const meteringDevicesApi = createApi({
  reducerPath: 'meteringDevicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['MeteringDevices'],
  endpoints: (build) => ({
    getMeteringDevices: build.query<MeteringDevice[], void>({
      query: () => 'metering-devices',
      providesTags: () => ['MeteringDevices'],
    }),
    getMeteringDevice: build.query<MeteringDevice, string | undefined>({
      query: (id) => `metering-devices/${id}`,
      providesTags: () => [{ type: 'MeteringDevices' }],
    }),
  }),
});

export const { useGetMeteringDeviceQuery, useGetMeteringDevicesQuery } = meteringDevicesApi;
