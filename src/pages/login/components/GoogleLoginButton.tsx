import Button from "@components/Button";
import { auth } from "@config/firebaseConfig";
import { useAuth } from "@contexts/AuthContext";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { fetchLoginData } from "@libs/api/auth";
import { getClubsInfo } from "@libs/api/club";
import ROUTE from "@libs/constant/path";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const navigate = usePrefixedNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    // console.log(userCredential);
    const oauthAccessToken = (userCredential as any)._tokenResponse
      .oauthAccessToken;
    const loginData = await fetchLoginData(oauthAccessToken);
    if (!loginData) {
      alert("로그인에 실패했습니다.");
      return;
    }

    login(loginData);

    const checkClubs = async () => {
      const { result } = await getClubsInfo();
      if (result.length === 0) {
        navigate(ROUTE.MEMBER_REGISTER);
      } else {
        navigate(ROUTE.ROOT);
      }
    };
    checkClubs();
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
