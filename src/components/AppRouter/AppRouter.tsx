import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "../../router";
import Error from "../../pages/ErrorPage";
import Template from "../Template";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            index={route.index}
            element={<route.element />}
          />
        ))}
        {/* <Route path="/login" element={<Navigate to="/admin" />} /> */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
