import { useEffect, useReducer, useState } from "react";
import axios from "axios"
import "./App.css"
import TodoList from "./component/TodoList/TodoList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import firebase methods here
import { collection, addDoc, updateDoc, doc, onSnapshot, getDoc, setDoc, getDocs } from "firebase/firestore";
import { db } from "./config";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_ALBUMS": {
      return {
        albums: payload.albums
      };
    }
    default:
      return state;
  }
};



function App() {
  const [state, dispatch] = useReducer(reducer, { albums: [] });
  const [todoToUpdate, setTodoToUpdate] = useState(null);

  const subscribeToExpenses = () => {
    return onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: "GET_ALBUMS", payload: { albums } });
    });
  };


  useEffect(() => {
    subscribeToExpenses();
  }, []);
  function generateUniqueId() {
    // Generate a random 8-character string
    const randomString = Math.random().toString(36).substring(2, 10);

    // Create a timestamp string
    const timestamp = new Date().getTime().toString(36);

    // Combine the random string and timestamp for a unique ID
    const uniqueId = randomString + timestamp;

    return uniqueId;
  }

  const addTodo = async (image) => {
    try {
      const aID = image.albumID;
      const albumDocRef = doc(db, "albums", aID);
      const albumDoc = await getDoc(albumDocRef);
      const newItemId = generateUniqueId(); 

      const newItem = {
        id: newItemId,
        ...image,
      };

      if (albumDoc.exists()) {
        const albumData = albumDoc.data();
        albumData?.items?.push(newItem);

        await setDoc(albumDocRef,albumData);
      }
      toast.success("Image added successfully.");

    } catch (error) {
      console.error('Error adding Image:', error);
      toast.error("An error occurred while adding Image.");
    }
  };

  const deleteTodo = async (image) => {
    try {
      console.log(image);

      // Retrieve the album document using albumId
      const albumId = image.albumID;
      const albumDocRef = doc(db, "albums", albumId);

      // Fetch the current album data
      const albumDoc = await getDoc(albumDocRef);

      if (albumDoc.exists()) {
        const albumData = albumDoc.data();

        // Find the index of the item within the items array using its id
        const itemIndex = albumData.items.findIndex((item) => item.id === image.id);

        if (itemIndex !== -1) {
          // Remove the item from the items array
          albumData.items.splice(itemIndex, 1);

          // Update the album document in Firestore with the updated items array
          await setDoc(albumDocRef, albumData);

          toast.info("Image deleted successfully.");
        } else {
          toast.error("Image not found in the album.");
        }
      } else {
        toast.error("Album not found.");
      }
    } catch (err) {
      console.error('Error deleting Image:', err);
      toast.error("An error occurred while deleting Image.");
    }
  };


  const resetTodoToupdate = () => {
    setTodoToUpdate(null);
  };

  const updateTodo = async (image) => {
    try {
      const { id, ...updatedData } = image;

      const albumId = image.albumID;
      const albumDocRef = doc(db, "albums", albumId);

      // Fetch the current album data
      const albumDoc = await getDoc(albumDocRef);

      if (albumDoc.exists()) {
        const albumData = albumDoc.data();
        // Find the item within the items array using its id
        const updatedItems = albumData.items.map((item) => {
          if (item.id === id) {
            // Update the item with the new data
            return {
              ...item,
              title: updatedData.title,
              url: updatedData.url,
            };
          }
          return item;
        });

        albumData.items = updatedItems;
        // Update the album document in Firestore with the updated data
        await setDoc(albumDocRef, albumData);

        toast.success("Image updated successfully.");
      } else {
        toast.error("Album not found.");
      }
    } catch (err) {
      console.error('Error updating Image:', err);
      toast.error("An error occurred while updating Image.");
    }
  };

  const updateTodoList = async (newAlbums) => {
    const albumsCollectionRef = collection(db, "albums");
    const existingAlbumsQuerySnapshot = await getDocs(albumsCollectionRef);
    const existingAlbums = existingAlbumsQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    existingAlbums.forEach(async (existingAlbum) => {
      const matchingNewAlbum = newAlbums.find((newAlbum) => newAlbum.id === existingAlbum.id);

      // Check if a matching album with the same ID was found in the new list
      if (matchingNewAlbum) {

        // Compare existingAlbum and matchingNewAlbum to check for differences
        const albumDataChanged = JSON.stringify(existingAlbum) !== JSON.stringify(matchingNewAlbum);

        if (albumDataChanged) {

          // Update the Firestore document with the new album data
          const albumDocRef = doc(db, "albums", existingAlbum.id);
          await setDoc(albumDocRef, matchingNewAlbum);

          dispatch({ type: "GET_ALBUMS", payload: { albums: newAlbums } });
        }
      }
    });
    toast.success("Album updated successfully.");
  }

  const updateAlbumList = async (album) => {
    try {
      const albumsRef = collection(db, "albums");
      const docRef = await addDoc(albumsRef, album);
      dispatch({
        type: "ADD_ALBUM",
        payload: { album: { id: docRef.id, ...album } }
      });
      toast.success("Album added successfully");
    } catch (err) {
      console.error('Error Adding album:', err);
      toast.error('Failed to Adding Album .');
    }

  }

  return (
    <div className="app">
      <ToastContainer position="bottom-right" />
      <TodoList
        addTodo={addTodo}
        todoToUpdate={todoToUpdate}
        updateTodo={updateTodo}
        resetTodoToupdate={resetTodoToupdate}
        group={state.albums}
        deleteTodo={deleteTodo}
        changeTodoToUpdate={setTodoToUpdate}
        updateTodoList={updateTodoList}
        updateAlbumList={updateAlbumList}
      />
    </div>
  );
}

export default App;