"use client";

import { makeStore } from "@/state/store/store";
import React, { type ReactNode, useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import type { AppStore } from "@/state/store";

type ReduxProviderType = {
  readonly children: ReactNode;
};

const ReduxProvider = ({ children }: ReduxProviderType) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
