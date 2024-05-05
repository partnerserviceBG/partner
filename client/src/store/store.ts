import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsApi } from '@services/post.service';
import { housesApi } from '@services/house.service';
import { usersApi } from '@services/user.service';
import { managementContractsApi } from '@services/management-contracts.service.ts';
import { meteringDevicesApi } from '@services/metering-devices.service.ts';
import { organisationInfoApi } from '@services/organisation-info.service.ts';
import { nsiApi } from '@services/nsi.service.ts';
import { debtRequestApi } from '@services/debt-request.service.ts';
import { appealsApi } from '@services/appeals.service.ts';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  [housesApi.reducerPath]: housesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [managementContractsApi.reducerPath]: managementContractsApi.reducer,
  [meteringDevicesApi.reducerPath]: meteringDevicesApi.reducer,
  [organisationInfoApi.reducerPath]: organisationInfoApi.reducer,
  [nsiApi.reducerPath]: nsiApi.reducer,
  [debtRequestApi.reducerPath]: debtRequestApi.reducer,
  [appealsApi.reducerPath]: appealsApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      housesApi.middleware,
      usersApi.middleware,
      managementContractsApi.middleware,
      meteringDevicesApi.middleware,
      organisationInfoApi.middleware,
      nsiApi.middleware,
      debtRequestApi.middleware,
      appealsApi.middleware,
    ),
});
