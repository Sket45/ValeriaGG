import { useState, useEffect } from "react";

import NextImage from "next/image";

interface ImageData {
  [key: string]: string[]; // Each key represents a folder name, and its value is an array of file names
}

interface newCompiledDataNoFolder {
  width: number[];
  height: number[];
  elements: JSX.Element[];
}

interface newCompiledDataFolder {
  [key: string]:
    | {
        width: number;
        height: number;
        element: JSX.Element;
      }
    | ImageData;
}

const useCompileImagess = (
  scaleRatio: number,
  isFolder: boolean,
  selectedFolder?: string | undefined
) => {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState<
    newCompiledDataNoFolder | newCompiledDataFolder
  >();

  const [imageData, setImageData] = useState<ImageData>();

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch("/api/images");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setImageData(data);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchImageData();
  }, [scaleRatio, isFolder]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!imageData) return;

    const useImageResize = async (
      imageSrc: string,
      alt: string,
      scaleRatio: number
    ): Promise<{ width: number; height: number; element: JSX.Element }> => {
      //logic for image resizing
      const { height: wHeight, width: wWidth } = windowDimensions;

      return new Promise<{
        width: number;
        height: number;
        element: JSX.Element;
      }>((resolve, reject) => {
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
          const widthRatio = wWidth / img.width;
          const heightRatio = wHeight / img.height;
          const scale = Math.min(widthRatio, heightRatio);

          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;

          const element = (
            <div
              style={{
                position: "relative",
                width: scaledWidth / scaleRatio,
                height: scaledHeight / scaleRatio,
              }}
            >
              <NextImage src={imageSrc} alt={alt} fill={true} quality={100} />
            </div>
          );

          resolve({
            width: scaledWidth / scaleRatio,
            height: scaledHeight / scaleRatio,
            element: element,
          });
        };

        img.onerror = (err) => {
          const placeholderElement = (
            <div
              style={{
                position: "relative",
                width: "100px", // Set width and height of placeholder image
                height: "100px",
                backgroundColor: "gray", // Set background color of placeholder image
              }}
            >
              Error loading image
            </div>
          );

          resolve({
            width: 0, // Set width and height of placeholder image
            height: 0,
            element: placeholderElement,
          });
        };
      });
    };

    const fetchData = async () => {
      if (selectedFolder) {
        const newCompiledData: newCompiledDataNoFolder = {
          width: [],
          height: [],
          elements: [],
        };

        const fileNames: string[] = imageData[selectedFolder];

        const promises = fileNames.map(async (fileName: string) => {
          const compiledItem = await useImageResize(
            `/images/${selectedFolder}/${fileName}`,
            fileName,
            scaleRatio
          ); // Resizing image
          newCompiledData.width.push(compiledItem.width);
          newCompiledData.height.push(compiledItem.height);
          newCompiledData.elements.push(
            <div
              key={fileName}
              style={{
                position: "relative",
                height: "100%",
                width: `${100 / imageData[selectedFolder].length}%`,
              }}
            >
              {compiledItem.element}
            </div>
          );
        });

        await Promise.all(promises); // Waiting for all promises to resolve

        setLoading(true);
        newCompiledData.width = [Math.max(...newCompiledData.width)];
        newCompiledData.height = [Math.max(...newCompiledData.height)];
        setNewData(newCompiledData); // Updating compiled data state
      } else {
        const newCompiledData: newCompiledDataFolder = {}; // Initializing compiled data object

        const promises = Object.keys(imageData).map(async (key) => {
          const fileName = imageData[key][0].split("/").pop() || ""; // Extracting the file name

          const compiledItem = await useImageResize(
            `/images/${key}/${imageData[key][0]}`,
            fileName,
            scaleRatio
          ); // Resizing image

          newCompiledData.imageData = imageData;
          newCompiledData[key] = compiledItem; // Adding compiled image to compiled data object
        });

        await Promise.all(promises); // Waiting for all promises to resolve
        setLoading(true);
        setNewData(newCompiledData); // Updating compiled data state
      }
    };

    fetchData(); // Calling fetchData function
  }, [imageData]);

  return newData ? newData : null;
};

export default useCompileImagess;
