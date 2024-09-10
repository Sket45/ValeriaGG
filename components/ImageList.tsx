import Link from "next/link";
import useCompileImagess from "./useCompileImages";
import Homestyles from "../styles/Home.module.scss";

const ImageList: React.FC = () => {
  const compiledImageData = useCompileImagess(1.6, true);

  return (
    <>
      {compiledImageData &&
      typeof compiledImageData === "object" &&
      "imageData" in compiledImageData ? (
        Object.keys(compiledImageData.imageData).map((key, index) => (
          <div key={key} className={Homestyles.Container_Main_Image}>
            {index % 2 === 0 ? (
              <div
                className={Homestyles.Container_Main_Image_Wrapper}
                style={{
                  // borderRight: "2px solid #a57676",
                  // padding: "0 23%",
                  marginBottom: "10%",
                  paddingLeft: "15%",
                }}
              >
                <Link
                  href={{
                    pathname: "/zoom",
                    query: { name: key },
                  }}
                >
                  {compiledImageData &&
                  typeof compiledImageData === "object" &&
                  "element" in compiledImageData[key] ? (
                    compiledImageData[key].element
                  ) : (
                    <div>Loading....</div>
                  )}
                </Link>
                <h1>"{key}"</h1>
              </div>
            ) : (
              <div
                className={Homestyles.Container_Main_Image_Wrapper}
                style={{
                  // borderLeft: "2px solid #a57676",
                  // padding: "0 22.5%",
                  marginTop: "25%",
                  paddingRight: "15%",
                }}
              >
                <Link
                  href={{
                    pathname: "/zoom",
                    query: { name: key },
                  }}
                >
                  {compiledImageData &&
                  typeof compiledImageData === "object" &&
                  "element" in compiledImageData[key] ? (
                    compiledImageData[key].element
                  ) : (
                    <div>Loading....</div>
                  )}
                </Link>
                <h1>"{key}"</h1>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ImageList;
