import { fetchLoginData } from "@api/login/fetchLoginData";
import Button from "@components/Button";
import { auth } from "@config/firebaseConfig";
import { useAuth } from "@contexts/AuthContext";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const navigate = usePrefixedNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    // console.log(userCredential);
    const oauthAccessToken = ((userCredential as any)._tokenResponse as any)
      .oauthAccessToken;
    const loginData = await fetchLoginData(oauthAccessToken);
    if (loginData) {
      login(loginData);
      navigate("/clubJoinOnboarding");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <Button
      text="Google로 시작하기"
      textColor="var(--color-black)"
      bgColor="var(--color-lightGray)"
      fontSize="1.4rem"
      imageUrl="/assets/images/logos/google.svg"
      onClick={handleGoogleLogin}
    />
  );
};

export default GoogleLoginButton;
