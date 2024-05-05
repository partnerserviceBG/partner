import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export interface useHandlerTabsParamsProps {
  tabs: { path: string; label: string }[];
  tabsName: string;
  nested?: boolean;
}
export const useHandlerTabsParams = ({ tabs, tabsName, nested }: useHandlerTabsParamsProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const param = searchParams.get(tabsName)
    if(param) {
      const index = tabs.findIndex((el) => el.path.includes(param));
      setTabIndex(index);
    } else {
      handleChange(tabs[0].path)
    }

  }, [searchParams]);

  const getIndex = (path: string) => {
    return  tabs.findIndex((el) => el.path.includes(path));
  }

  const handleChange = (path: string) => {
    const newParams = { [tabsName]: path }
    if(getIndex(path) !== tabIndex) {
      nested ? setSearchParams((searchParams) => {
        const prevParams: {[key: string]: string} = {};
        searchParams.forEach((value, key) => {
          prevParams[key] = value;
        });
        return { ...prevParams, ...newParams };
      }) : setSearchParams(newParams);
    }
  };

  return {tabIndex, handleChange}
};
