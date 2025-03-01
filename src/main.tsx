import { createRoot } from "react-dom/client"
import App from "@/App"
import "normalize.css"
import "@/assets/css/index.css"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import store from "./store"
import theme from "./assets/theme"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>
)
