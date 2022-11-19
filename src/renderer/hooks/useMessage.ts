import { useCallback, useEffect, useState } from 'react';

import { PreloadApi } from '../../ipc';

export type MessageResponse<R> = {
  loading: boolean;
  data: R | undefined;
  error: Error | undefined;
};

const useMessage = <T extends keyof PreloadApi, R = Awaited<ReturnType<PreloadApi[T]>>, P = Parameters<PreloadApi[T]>>(
  messageType: T,
  // @ts-ignore
  ...variables: P
): MessageResponse<R> => {
  const key = `${messageType}::${JSON.stringify(variables)}`;
  const [data, setData] = useState<R>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const runMessage = useCallback(() => {
    setLoading(true);

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
  }, [key]);

  useEffect(() => {
    runMessage();
  }, [runMessage]);

  return { data, loading, error };
};

export default useMessage;
