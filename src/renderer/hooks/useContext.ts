import { useContext as useReactContext } from 'react';

import { AppContext, Context } from '../state/context';

const useContext = (): Context => useReactContext(AppContext);

export default useContext;
