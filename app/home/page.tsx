"use client";
import React from "react";
import Homestyles from "../../styles/Home.module.scss";

import ImageList from "../../components/ImageList";

const Home: React.FC = () => {
  return (
    <>
      <main className={Homestyles.Container_Main}>
        <ImageList />
      </main>
    </>
  );
};

export default Home;
