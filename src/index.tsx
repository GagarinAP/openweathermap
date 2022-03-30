import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import Screens from "./screens";
import ThemeProvider from "./hooks/themeProvider";

const App = () => {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider>
                  <Screens />
              </ThemeProvider>
          </PersistGate>
      </Provider>
  );
};

export default App;
