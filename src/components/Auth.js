import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

export const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  console.log(auth?.currentUser?.userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const LogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email..."
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password..."
        onChange={handleChange}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={LogOut}>Log Out</button>
      <br />
      <button onClick={signInWithGoogle}>
        Sign In With Google <FaGoogle />{" "}
      </button>
    </div>
  );
};
