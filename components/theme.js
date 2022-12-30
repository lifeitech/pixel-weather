import { useState, useContext, createContext } from 'react';
import chroma from 'chroma-js';

const darkTheme = {
  name: 'dark',
  colors: {
    text: "#fff",  // #ececec
    textSecondary:"#DADADA",
    background: "#18191a", // "#23272f",  #18191a
    backgroundSecondary: "#242526", // "#343a46",  #242526
    border: "#d7d7d7",
    highlight: chroma("#242526").brighten(1).hex(),
    ripple: "rgba(0,0,0,1)",
    btnBackground: "#fff",
    btnText: "#000",
  }
}

const lightTheme = {
  name: 'light',
  colors: {
    text: "#000000",
    textSecondary:"#5E5E5E",
    background: "#E8E8E8",
    backgroundSecondary: "#DCDCDC",
    border: "#B2B2B2",
    highlight: chroma("#DCDCDC").darken(1).hex(),
    ripple: "rgba(0,0,0,0.4)",
    btnBackground: "#000",
    btnText: "#fff",
  }
}


const ThemeContext = createContext(darkTheme);
const ToggleThemeContext = createContext();


export function useTheme(){
  return useContext(ThemeContext)
}

export function useToggleTheme(){
  return useContext(ToggleThemeContext)
}


export function ThemeProvider({children}) {
  const [theme, setTheme] = useState(darkTheme);
  
  const toggleTheme = (theme) => {
    if (theme.name == 'light'){
      setTheme(darkTheme);
    }
    else {
      setTheme(lightTheme);
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        {children}
      </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  )
}