import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface ImageData {
  [key: string]: string[];
}

export async function GET() {
  const imageDir = path.join(process.cwd(), "public/images");

  // Read the directories inside the images folder
  try {
    const directories = await fs.promises.readdir(imageDir, {
      withFileTypes: true,
    });

    // Filter directories and process each one
    const promises = directories.map((directory) => {
      if (directory.isDirectory()) {
        const dirPath = path.join(imageDir, directory.name);
        return fs.promises.readdir(dirPath).then((files) => {
          const fileNames: string[] = files.filter((file) => {
            const filePath = path.join(dirPath, file);
            return fs.statSync(filePath).isFile();
          });
          return { [directory.name]: fileNames };
        });
      }
    });

    const results = await Promise.all(promises);
    const imageData: ImageData = Object.assign({}, ...results);

    return NextResponse.json(imageData, { status: 200 });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json(
      { error: "Error reading directory" },
      { status: 500 }
    );
  }
}
