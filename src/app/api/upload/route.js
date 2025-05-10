import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files"); // Retrieve all files

    if (!files || files.length === 0) {
      alert("No files uploaded");
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Save directory: public/uploads/
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const uploadedFiles = [];

    for (const file of files) {
      // Prevent filename conflicts (e.g., add a timestamp)
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      // Add the uploaded file's URL to the response
      uploadedFiles.push(`/uploads/${fileName}`);
    }

    // Return the URLs of the uploaded files
    return NextResponse.json({ uploadedFiles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
