import { Box, BoxProps, Button, ButtonProps, styled } from "@mui/material";

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

export const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  ":hover": {
    backgroundColor: `${theme.palette.primary.main}`
  }
}))