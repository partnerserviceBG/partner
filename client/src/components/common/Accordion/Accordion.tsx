import { AccordionProps, styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={1} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    marginBottom: '20px',
  },
}));