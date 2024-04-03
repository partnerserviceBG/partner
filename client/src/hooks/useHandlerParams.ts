import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export interface useHandlerParamsProps {
  tabs: { path: string; label: string }[];
  path: string;
}
export const useHandlerParams = ({ path, tabs }: useHandlerParamsProps) => {
  const [index, setIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const param = searchParams.get(path);
    if (param) {
      const index = tabs.findIndex((el) => el.path.includes(param!));
      setIndex(index);
    } else {
      setSearchParams({ tab: tabs[0].path });
    }
  }, [searchParams]);
  return {
    index,
    setSearchParams,
  };
};
