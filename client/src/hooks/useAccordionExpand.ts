import { SyntheticEvent, useState } from 'react';

export const useAccordionExpand = (): [number | false | undefined, (index: number) => (event: SyntheticEvent<Element, Event>, expanded: boolean) => void] => {
  const [expanded, setExpanded] = useState<number | false>();
  const handleChange =
    (index: number) => (_event: SyntheticEvent<Element, Event>, newExpanded: boolean) => {
      setExpanded(newExpanded ? index : false);
    };
  return [expanded, handleChange]
}