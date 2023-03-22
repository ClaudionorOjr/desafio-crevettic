import { Box, BoxProps, styled, TextField, TextFieldProps } from "@mui/material";

export const CustomBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '48rem',
  backgroundColor: `${theme.palette.background.default}`,
  padding: '3.5rem',
  boxShadow: '0 4px 4px rgba(00, 00, 00, 0.25)',
  borderRadius: 5,
}))

export const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  input: {
    fontWeight: 500
  },
  label: { 
    color: `${theme.palette.neutral?.main}`,
    fontWeight: 500
  }
}))