// import { auth ,googleProvider} from "../config/firebase";
// import { createUserWithEmailAndPassword ,signInWithPopup,signOut} from "firebase/auth";
// import { useState } from "react";


// export const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // console.log(auth?.currentUser?.photoURL);

//   const signIn = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err)
//     }
    
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   const logOut = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <div>
//       <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
//       <input
//         placeholder="Password.."
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={signIn}>Sign In</button>
//       <button onClick={signInWithGoogle}>Sign In With Google</button>
//       <button onClick={logOut}>LogOut</button>
//     </div>
//   );
// };

import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password.."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn} disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>
      <button onClick={signInWithGoogle} disabled={loading}>
        {loading ? "Signing In..." : "Sign In With Google"}
      </button>
      {auth.currentUser && (
        <button onClick={logOut} disabled={loading}>
          {loading ? "Logging Out..." : "LogOut"}
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

