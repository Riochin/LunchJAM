import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from 'firebase/auth';
import app from '../firebase';
import axios from 'axios';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Googleログイン
export const loginWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google login error:', error);
    return null;
  }
};

// メール＆パスワードでログイン
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Email login error:', error);
    return null;
  }
};

// メール＆パスワードで新規登録
export const registerWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Email registration error:', error);
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

// バックエンドにGoogleログイン情報を送信
const sendGoogleLoginToBackend = async (user: User) => {
  const idToken = await user.getIdToken();
  const backendUrl = 'http://127.0.0.1:8000/' + 'users/register';
  // console.log("backendUrl: " + backendUrl);
  // console.log("idToken: " + idToken);

  try {
    const response = await axios.post(backendUrl, { token: idToken });
    console.log('バックエンドからのレスポンス:', response.data);
    return true; // バックエンドへの送信が成功したらtrueを返す
  } catch (error) {
    console.error('バックエンドへの送信エラー:', error);
    return false; // バックエンドへの送信が失敗したらfalseを返す
  }
};

// Googleログイン
export const handleGoogleLogin = async (): Promise<boolean> => {
  // 戻り値の型を Promise<boolean> に変更
  const user = await loginWithGoogle();
  if (user) {
    return await sendGoogleLoginToBackend(user); // バックエンドへの送信結果を返す
  }
  return false; // ログイン失敗時にfalseを返す
};

// メール＆パスワードでログイン
export const handleEmailLogin = async (email: string, password: string) => {
  const user = await loginWithEmail(email, password);
  console.log('ログイン成功！');
  if (user) {
    await sendGoogleLoginToBackend(user); // バックエンドに送信
  }
};
