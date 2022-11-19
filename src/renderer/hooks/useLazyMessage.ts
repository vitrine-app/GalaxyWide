import { useState } from 'react';

import { PreloadApi } from '../../ipc';

import { MessageResponse } from './useMessage';

const useLazyMessage = <
  T extends keyof PreloadApi,
  R = Awaited<ReturnType<PreloadApi[T]>>,
  P = Parameters<PreloadApi[T]>,
>(
  messageType: T,
  // @ts-ignore
  ...variables: P
): [() => void, MessageResponse<R>] => {
  const [data, setData] = useState<R>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const sendMessage = (): void => {
    // @ts-ignore
    window.electron[messageType](...variables)
      .then((value) => {
        setData(value as unknown as R);
        setLoading(false);
        setError(undefined);
      })
      .catch((err: Error) => {
        setData(undefined);
        setLoading(false);
        setError(err);
      });
  };

  return [sendMessage, { data, loading, error }];
};

export default useLazyMessage;
