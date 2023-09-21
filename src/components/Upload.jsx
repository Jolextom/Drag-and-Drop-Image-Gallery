import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

import { v4 } from "uuid";

const Upload = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [tag, setTag] = useState("");
  const [downloadURL, setdownloadURL] = useState("");

  const imageCollectionRef = collection(db, "images");
  const uploadImage = async () => {
    if (imageUpload == null || tag == "") {
      console.log("add image");
    } else {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

      // console.log(imageRef);
      try {
        await uploadBytes(imageRef, imageUpload);
        setImageUpload(null);
        const downloadUrlLink = await getDownloadURL(imageRef);

        await addDoc(imageCollectionRef, { tag: tag, url: downloadUrlLink });
        console.log("image uploaded sucessfully");
        document.getElementById("imageInput").value = "";
        setTag("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="fixed border bottom-0 w-full h-10 flex items-center justify-between p-3 z-50">
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={(e) => setImageUpload(e.target.files[0])}
      />
      <div>
        <label htmlFor="tag">tag: </label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border border-orange-400 "
        />
      </div>

      <button onClick={uploadImage}>upload Image</button>
    </div>
  );
};

export default Upload;
