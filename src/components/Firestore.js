import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export const Firestore = () => {
  const [movieList, setMovieList] = useState([]);

  //Update Movie Title
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    releaseDate: 0,
    award: false,
  });

  const { title, releaseDate, award } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // read our database
  const getMovieList = async () => {
    try {
      // read the data
      const data = await getDocs(collection(db, "movies"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //set the movie list
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  // 09082383136
  useEffect(() => {
    getMovieList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add Data to firebase
      await addDoc(collection(db, "movies"), {
        title,
        releaseDate,
        award,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error.message);
    }

    setFormData({ title: "", releaseDate: "" });
  };

  const deleteMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
      const updatedPost = movieList.filter(function (item) {
        return item.id !== id;
      });

      setMovieList(updatedPost);
    } catch (error) {
      console.log(error);
    }
  };

  //   const updateMovieTitle = async (id) => {
  //     try {
  //       await updateDoc(doc(db, "movies", id), { title: updatedTitle });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Movie Title"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="releaseDate"
            value={releaseDate}
            placeholder="Release Date"
            onChange={handleChange}
          />
          <br />
          <input
            type="checkbox"
            name="award"
            checked={award}
            onChange={handleChange}
          />
          <label htmlFor="award">Received an Oscar</label>
          <br />
          <button> Submit Movie</button>
        </form>
      </div>
      {movieList.map(function (movie, index) {
        return (
          <div key={index}>
            <h2 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h2>
            <p>Date:{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>
              {" "}
              Delete Movie{" "}
            </button>
            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              {" "}
              Update Title
            </button>
          </div>
        );
      })}
    </div>
  );
};
