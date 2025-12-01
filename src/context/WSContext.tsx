import React, { createContext, useContext } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

type WSContextValue = {
  data: any;
  isConnected: boolean;
};

const WSContext = createContext<WSContextValue>({
  data: null,
  isConnected: false,
});

type WebSocketProviderProps = {
  path?: string;
  children: React.ReactNode;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  path = "/connect",
  children,
}) => {
  const { data, isConnected } = useWebSocket(path);

  return (
    <WSContext.Provider value={{ data, isConnected }}>
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => useContext(WSContext);
