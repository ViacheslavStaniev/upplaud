export default function Accordion(theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5),
          backgroundColor: '#FAF5FC',
          border: '1px solid #FAF5FC',
          marginBottom: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          '&.Mui-expanded': {
            border: '1px solid #893DA0',
            boxShadow: theme.customShadows.z8,
            backgroundColor: theme.palette.background.paper,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  };
}
