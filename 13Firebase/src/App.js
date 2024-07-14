// import logo from './logo.svg';
import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewreleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // file upload state
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    // getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    // getMovieList();
  };

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
    // getMovieList();
  };

  

  useEffect(() => {
    const getMovieList = async () => {
      //READ THE DATA
      // SET THE MOVIE LIST
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(filteredData);
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, [onSubmitMovie]);


  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />

        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewreleaseDate(Number(e.target.value))}
        />

        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />

        <label>Received an Oscar</label>

        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />

            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;


// import { useEffect, useState } from "react";
// import "./App.css";
// import { Auth } from "./components/auth";
// import { db, auth, storage } from "./config/firebase";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";
// import { ref, uploadBytes } from "firebase/storage";

// function Movie({ movie, deleteMovie, updateMovieTitle }) {
//   const [updatedTitle, setUpdatedTitle] = useState("");

//   return (
//     <div>
//       <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
//         {movie.title}
//       </h1>
//       <p>Date: {movie.releaseDate}</p>

//       <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

//       <input
//         placeholder="New title..."
//         value={updatedTitle}
//         onChange={(e) => setUpdatedTitle(e.target.value)}
//       />

//       <button onClick={() => updateMovieTitle(movie.id, updatedTitle)}>
//         Update Title
//       </button>
//     </div>
//   );
// }

// function App() {
//   const [movieList, setMovieList] = useState([]);
//   const [newMovieTitle, setNewMovieTitle] = useState("");
//   const [newReleaseDate, setNewreleaseDate] = useState(0);
//   const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
//   const [fileUpload, setFileUpload] = useState(null);

//   const moviesCollectionRef = collection(db, "movies");

//   const deleteMovie = async (id) => {
//     const movieDoc = doc(db, "movies", id);
//     await deleteDoc(movieDoc);
//     getMovieList();
//   };

//   const updateMovieTitle = async (id, title) => {
//     const movieDoc = doc(db, "movies", id);
//     await updateDoc(movieDoc, { title });
//     getMovieList();
//   };

//   const onSubmitMovie = async () => {
//     try {
//       await addDoc(moviesCollectionRef, {
//         title: newMovieTitle,
//         releaseDate: newReleaseDate,
//         receivedAnOscar: isNewMovieOscar,
//         userId: auth?.currentUser?.uid,
//       });
//       // setNewMovieTitle("");
//       // setNewreleaseDate(0);
//       // setIsNewMovieOscar(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getMovieList = async () => {
//     try {
//       const data = await getDocs(moviesCollectionRef);
//       const filteredData = data.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setMovieList(filteredData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getMovieList();
//   }, []);

//   const uploadFile = async () => {
//     if (!fileUpload) return;
//     const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
//     try {
//       await uploadBytes(filesFolderRef, fileUpload);
//       // Optionally, you can trigger some action after successful upload
//     } catch (err) {
//       console.error(err);
//       // Handle error here
//     }
//   };

//   return (
//     <div className="App">
//       <Auth />

//       <div>
//         <input
//           placeholder="Movie title..."
//           value={newMovieTitle}
//           onChange={(e) => setNewMovieTitle(e.target.value)}
//         />

//         <input
//           placeholder="Release Date..."
//           type="number"
//           value={newReleaseDate}
//           onChange={(e) => setNewreleaseDate(Number(e.target.value))}
//         />

//         <input
//           type="checkbox"
//           checked={isNewMovieOscar}
//           onChange={(e) => setIsNewMovieOscar(e.target.checked)}
//         />
//         <label>Received an Oscar</label>

//         <button onClick={onSubmitMovie}>Submit Movie</button>
//       </div>

//       <div>
//         {movieList.map((movie) => (
//           <Movie
//             key={movie.id}
//             movie={movie}
//             deleteMovie={deleteMovie}
//             updateMovieTitle={updateMovieTitle}
//           />
//         ))}
//       </div>

//       <div>
//         <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
//         <button onClick={uploadFile}>Upload file</button>
//       </div>
//     </div>
//   );
// }

// export default App;
