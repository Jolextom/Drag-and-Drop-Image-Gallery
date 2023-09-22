import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import Sortable from "sortablejs";
import { useGlobalContext } from "../context";

const ImageGrid = () => {
  const [imageList, setImageList] = useState([]);
  const imageCollectionRef = collection(db, "images");
  const { user, searchInput } = useGlobalContext();

  useEffect(() => {
    // Filter the images based on the search input
    // if (searchInput == '') {

    // }
    const filtered = imageList.filter((image) =>
      image.tag.toLowerCase().includes(searchInput.toLowerCase())
    );
    setImageList(filtered);
  }, [searchInput]);

  const handleDragEnd = (evt) => {
    const imageId = evt.item.getAttribute("data-id");
    const newIndex = Array.from(evt.to.children).indexOf(evt.item);

    // Update the image order in your state or database
    // You can use setImageList to reorder the images in your state
    // or make an API call to update the order in your database
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(imageCollectionRef, (snapshot) => {
      const imageList = [];
      snapshot.forEach((doc) => {
        const imageData = doc.data();
        imageList.push(imageData);
      });
      console.log(imageList);
      setImageList(imageList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Fetch the initial data using getDocs
    const fetchData = async () => {
      try {
        const data = await getDocs(imageCollectionRef);
        const imageList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setImageList(imageList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetchData function after component mounts

    // Initialize SortableJS when the component mounts
    const container = document.getElementById("imageGrid");
    new Sortable(container, {
      animation: 150,
      onEnd: handleDragEnd, // Define the function to handle image reordering
    });
  }, []);

  const container = document.getElementById("imageGrid");
  new Sortable(container, {
    animation: 150,
    onEnd: handleDragEnd, // Define the function to handle image reordering
  });
  // if (!user) {
  //   console.log("login");
  // } else {
  // }

  return (
    <div
      id="imageGrid"
      className="grid grid-cols-2 gap-4 sm:grid-cols-5 lg:grid-cols-6 p-2"
    >
      {imageList.map((image) => (
        <div
          key={image.id}
          data-id={image.id} // Set the image ID as a data attribute
          className="w-full h-auto object-cover"
        >
          <img
            src={image.url}
            alt={image.id}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
