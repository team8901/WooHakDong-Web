import GoogleIcon from '@assets/images/logos/GoogleIcon';
import Button from '@components/Button';
import { auth } from '@config/firebaseConfig';
import { useAuth } from '@contexts/AuthContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { fetchLoginData } from '@libs/api/auth';
import ROUTE from '@libs/constant/path';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const navigate = useCustomNavigate();
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const oauthAccessToken = (userCredential as any)._tokenResponse.oauthAccessToken;

      const res = await fetchLoginData({ accessToken: oauthAccessToken });

      if (!res) {
        setToastMessage(`학교 계정으로 로그인해 주세요`);
        return;
      }

      login(res);
      navigate(ROUTE.ROOT);
    } catch (error) {
      setToastMessage(`로그인에 실패했어요\n${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      text="Google로 시작하기"
      textColor="var(--color-black)"
      bgColor="var(--color-lightGray)"
      fontSize="1.4rem"
      icon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      isLoading={isLoading}
    />
  );
};

export default GoogleLoginButton;
