import { SyntheticEvent, useState } from 'react';

export const useAccordionExpand = (): [number | false | undefined, (index: number) => (event: SyntheticEvent<Element, Event>, expanded: boolean) => void] => {
  const [expanded, setExpanded] = useState<number | false>();
  const handleChange =
    // @ts-ignore
    (index: number) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? index : false);
    };
  return [expanded, handleChange]
}