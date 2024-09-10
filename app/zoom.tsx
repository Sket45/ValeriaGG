import React from "react";
import Homestyles from "../styles/Home.module.scss";
import ZoomIn from "../components/zoomIn";

const Zoom = () => {
  return (
    <div className={Homestyles.Container_Modal}>
      <ZoomIn />
    </div>
  );
};

export default Zoom;
