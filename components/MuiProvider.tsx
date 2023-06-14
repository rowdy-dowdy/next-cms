'use client'

import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from '@mui/material'
import React from "react";
import { Roboto, Source_Sans_Pro, Source_Sans_3 } from 'next/font/google'
import { SnackbarProvider } from 'notistack';
import { grey } from "@mui/material/colors";

const font = Source_Sans_3({
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: grey[900]
    },
  },
  typography: {
    fontFamily: font.style.fontFamily
  }
});

const MuiProvider: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <style global jsx>
        {`html {
          font-family: ${font.style.fontFamily};
        }`}
      </style>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default MuiProvider