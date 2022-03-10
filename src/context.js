import React from "react";

const appContext = React.createContext();

const Provider = appContext.Provider; // provide the data

const Consumer = appContext.Consumer; // consume the data provided by Provider

export {Provider, Consumer, appContext}; 