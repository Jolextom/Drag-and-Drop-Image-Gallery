import React, { useEffect, useState, useRef } from "react";
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
  const sortableInstanceRef = useRef(null);

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
      console.error(error);
    }
  };

  const destroySortableInstance = () => {
    if (sortableInstanceRef.current) {
      sortableInstanceRef.current.destroy();
      sortableInstanceRef.current = null;
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchInput) {
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

  const handleDragStart = (evt) => {
    if (!user) {
      // Prevent dragging if the user is not logged in
      evt.preventDefault();

      // Set a custom cursor style to indicate that dragging is not allowed
      evt.dataTransfer.effectAllowed = "none";
      evt.dataTransfer.dropEffect = "none";
      evt.target.style.cursor = "not-allowed";
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(imageCollectionRef, (snapshot) => {
      const imageList = [];
      snapshot.forEach((doc) => {
        const imageData = doc.data();
        imageList.push(imageData);
      });
      setImageList(imageList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (sortableContainerRef.current) {
      sortableInstanceRef.current = new Sortable(sortableContainerRef.current, {
        animation: 150,
        onEnd: handleDragEnd,
      });
    }
  }, [imageList, searchInput]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!user && (
        <div className="grid place-items-center py-3">
          <div className="ml-4 text-xs inline-flex gap-3  items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p>You cannot use the drag and drop feature without signing in.</p>
          </div>
        </div>
      )}
      <div ref={sortableContainerRef} className="resp_grid p-4 relative">
        {imageList.length === 0 ? (
          <div className="grid place-items-center py-3 absolute top-0 w-full">
            <div className="ml-4 text-xs inline-flex gap-3 items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              <p>Tag not found. Please try a different tag.</p>
            </div>
          </div>
        ) : (
          imageList.map((image) => (
            <div
              key={image.id}
              data-id={image.id}
              className="h-32 object-cover relative"
              draggable={user ? true : false}
              onDragStart={handleDragStart}
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
    </>
  );
};

export default ImageGrid;
