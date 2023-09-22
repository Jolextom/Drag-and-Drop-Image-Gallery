import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import Sortable from "sortablejs";
import { useGlobalContext } from "../context";
import Loading from "./Loading";

const ImageGrid = () => {
  const [imageList, setImageList] = useState([]);
  const imageCollectionRef = collection(db, "images");
  const [loading, setLoading] = useState(true);
  const { user, searchInput } = useGlobalContext();
  const sortableContainerRef = useRef(null);

  const fetchData = async () => {
    try {
      const data = await getDocs(imageCollectionRef);
      const imageList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoading(false);
      setImageList(imageList);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the initial data using getDocs
    setLoading(true);

    fetchData(); // Call the fetchData function after component mounts
  }, []);

  useEffect(() => {
    if (sortableContainerRef.current) {
      // Initialize SortableJS when the image list changes
      new Sortable(sortableContainerRef.current, {
        animation: 150,
        onEnd: handleDragEnd, // Define the function to handle image reordering
      });
    }
  }, [searchInput, imageList]);

  useEffect(() => {
    if (searchInput === "") {
      // If search input is empty, reset the image list to the original list
      fetchData();
      return;
    }
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      ref={sortableContainerRef}
      className="grid grid-cols-2 gap-4 sm:grid-cols-5 lg:grid-cols-6 p-2"
    >
      {imageList.length === 0 ? (
        <p className="text-center text-gray-500">Tag not found.</p>
      ) : (
        imageList.map((image) => (
          <div
            key={image.id}
            data-id={image.id} // Set the image ID as a data attribute
            className="w-full h-auto object-cover relative"
          >
            <img
              src={image.url}
              alt={image.id}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-1.5 left-1.5 bg-white text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {image.tag}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGrid;
