import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

interface ErrorPayload {
  message?: string;
}

const getErrorMessage = (action: unknown): string | null => {
  if (!isRejectedWithValue(action)) {
    return null;
  }

  const endpointName = (action.meta as { arg?: { endpointName?: string } })?.arg?.endpointName;
  if (endpointName === 'refresh') {
    return null;
  }

  const status = (action.payload as { status?: number })?.status;
  if (status === 429) {
    return 'Слишком много запросов. Попробуйте позже.';
  }

  const payload = (action.payload as { data?: ErrorPayload })?.data;
  if (payload?.message) {
    return payload.message;
  }

  if (status && status >= 500) {
    return 'Ошибка сервера. Попробуйте позже.';
  }

  return null;
};

export const apiErrorMiddleware: Middleware =
  (_api: MiddlewareAPI) => (next) => (action: unknown) => {
    const message = getErrorMessage(action);
    if (message) {
      enqueueSnackbar(message, {
        autoHideDuration: 2500,
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
    return next(action);
  };
