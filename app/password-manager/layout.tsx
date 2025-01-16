"use client";

import ReduxProvider from "@/store/providers/redux-provider";

const Wrapper = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Wrapper;
