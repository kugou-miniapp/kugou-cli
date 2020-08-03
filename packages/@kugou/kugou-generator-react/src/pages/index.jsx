import React, { useEffect, useReducer } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "@/views/home";
import { fetchReducer } from "@/store/reducers";
import { StoreContext } from "@/store";
import "@/styles/index.scss";

export default function App() {
  const [fetchesState, dispatch] = useReducer(fetchReducer, {
    isFetching: false,
    user: {}
  });

  useEffect(() => {
    const handleTouchStart = () => {};

    document.body.addEventListener("touchstart", handleTouchStart, false);

    return () => {
      document.body.removeEventListener("touchstart", handleTouchStart, false);
    };
  }, []);

  return (
    <StoreContext.Provider value={{ fetchesState, dispatch }}>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </StoreContext.Provider>
  );
}
