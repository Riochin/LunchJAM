import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Googleログイン
export const loginWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
};

// メール＆パスワードでログイン
export const loginWithEmail = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Email login error:", error);
    return null;
  }
};

// メール＆パスワードで新規登録
export const registerWithEmail = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Email registration error:", error);
    return null;
  }
};

// ログアウト
export const logout = async () => {
  await signOut(auth);
};

// 現在のユーザー取得
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
