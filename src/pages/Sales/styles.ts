import styledEmotion from "@emotion/styled";
import { styled, Box, BoxProps, TextField, TextFieldProps, Typography, TypographyProps } from "@mui/material";

export const CustomBox = styled(Box)<BoxProps>(() => ({
  width: 'calc(100vw - 12rem)',
  maxWidth: 900,
  margin: '0 auto',
  padding: '3.5rem',
  boxShadow: '0 4px 4px rgba(00, 00, 00, 0.25)',
  borderRadius: 20
}))

export const CustomTypography = styled(Typography)<TypographyProps>(() => ({
  fontSize: 20,
  fontWeight: 600,
  marginBottom: '2rem'
}))

export const CustomForm = styledEmotion.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

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