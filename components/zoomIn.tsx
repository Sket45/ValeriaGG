import React, { useEffect, useState } from "react";
import Zoomstyles from "../styles/Zoom.module.scss";
import useCompileImagess from "./useCompileImages";
import { useRouter } from "next/router";
import imagesData from "../public/data/imagesData.json";

interface Props {
  [key: string]: any;
}

const zoomIn: React.FC<Props> = () => {
  const router = useRouter();

  const imageName = router.query.name as string | undefined;
  const imageInfo = imageName
    ? imagesData[imageName as keyof typeof imagesData]
    : undefined;

  const compiledImageData = useCompileImagess(1.15, false, imageName);

  const [transformHandler, setTransformHandler] = useState({});

  const [widthCounter, setWidthCounter] = useState({
    width: 0,
    currentWidth: 0,
  });

  useEffect(() => {
    if (compiledImageData && compiledImageData.elements) {
      const elementsArray = Array.isArray(compiledImageData.elements)
        ? compiledImageData.elements // It's already an array
        : [compiledImageData.elements]; // Convert to an array
      setWidthCounter((prevState) => ({
        ...prevState,
        width: 100 * elementsArray.length,
        currentWidth: 0,
      }));
    }
  }, [compiledImageData]);

  const onClick = (indicator: "next" | "prev") => {
    if (compiledImageData && compiledImageData.elements) {
      const elementsArray = Array.isArray(compiledImageData.elements)
        ? compiledImageData.elements // It's already an array
        : [compiledImageData.elements]; // Convert to an array
      if (indicator === "next") {
        setWidthCounter((prevState) => ({
          ...prevState,
          currentWidth: prevState.currentWidth + 100 / elementsArray.length,
        }));
      } else if (indicator === "prev") {
        if (widthCounter.currentWidth === 0) {
          setWidthCounter((prevState) => ({
            ...prevState,
            currentWidth: 100,
          }));
        }
        setWidthCounter((prevState) => ({
          ...prevState,
          currentWidth: prevState.currentWidth - 100 / elementsArray.length,
        }));
      }
    }
  };

  useEffect(() => {
    if (widthCounter.currentWidth >= 100) {
      setWidthCounter((prevState) => ({
        ...prevState,
        currentWidth: 0,
      }));
    } else if (widthCounter.currentWidth < 0) {
      setWidthCounter((prevState) => ({
        ...prevState,
        currentWidth: 0,
      }));
    }
  }, [widthCounter.currentWidth]);

  useEffect(() => {
    setTransformHandler({
      transform: `translateX(-${widthCounter.currentWidth}%)`,
    });
  }, [widthCounter.currentWidth]);

  return (
    <div className={Zoomstyles.Container}>
      <div
        className={Zoomstyles.Container_CloseBtn}
        onClick={() => router.back()}
      >
        X
      </div>
      <div className={Zoomstyles.Container_Image}>
        <div
          className={Zoomstyles.Container_Image_Next}
          onClick={() => onClick("prev")}
        >
          {"<"}
        </div>
        {compiledImageData && compiledImageData.elements ? (
          <div
            className={Zoomstyles.Container_Image_Wrapper}
            style={{
              width:
                typeof compiledImageData === "object" &&
                Array.isArray(compiledImageData.width) &&
                typeof compiledImageData.width[0] === "number"
                  ? compiledImageData.width[0] // Accessing the first element of the width array
                  : "100%",
              height:
                typeof compiledImageData === "object" &&
                Array.isArray(compiledImageData.height) &&
                typeof compiledImageData.height[0] === "number"
                  ? compiledImageData.height[0]
                  : "100%",
            }}
          >
            <div
              className={Zoomstyles.Container_Image_Wrapper_Functional}
              style={transformHandler}
            >
              {Array.isArray(compiledImageData.elements) ? (
                compiledImageData.elements.map((element) => element)
              ) : (
                <>{compiledImageData.elements}</>
              )}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div
          className={Zoomstyles.Container_Image_Next}
          onClick={() => onClick("next")}
        >
          {">"}
        </div>
      </div>
      <div className={Zoomstyles.Container_Description}>
        <div className={Zoomstyles.Container_Description_Wrapper}>
          {imageInfo && (
            <>
              <h1>"{imageInfo.name}"</h1>
              <span>
                {imageInfo.type}
                <br></br>
                {Math.round((imageInfo.size[0] / 2.54) * 10) / 10} x{" "}
                {Math.round((imageInfo.size[1] / 2.54) * 10) / 10} inches
                <br></br>({imageInfo.size[0]} x {imageInfo.size[1]}cm)<br></br>
                {imageInfo.year}
                <br></br>
                {imageInfo.place}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default zoomIn;
