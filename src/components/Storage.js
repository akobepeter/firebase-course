import { useState } from "react";
import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";

export const Storage = () => {
  //file Upload
  const [fileUpload, setFileUpload] = useState(null);

  const handleFileUpload = async () => {
    if (!fileUpload) return;

    const filesFolderRef = ref(storage, `images/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
      <br />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};
