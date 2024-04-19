import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from "./App"
import { store } from "./redux/store"
import "react-toastify/dist/ReactToastify.css"
import { GG_OAUTH_ID } from "./envVariables"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <GoogleOAuthProvider clientId={GG_OAUTH_ID}>
      <Provider store={store}>
        <App />
        <ToastContainer autoClose={3000} />
      </Provider>
    </GoogleOAuthProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
