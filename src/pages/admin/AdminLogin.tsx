import Button from '@components/Button';
import Input from '@components/Input';
import Title2 from '@components/Title2';
import { useAuth } from '@contexts/AuthContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { fetchLoginData } from '@libs/api/admin';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';

const AdminLoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useCustomNavigate();
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetchLoginData({ memberLoginId: loginId, memberPassword: password });

      login(res);
      localStorage.setItem('admin', loginId);

      setToastMessage('로그인에 성공했어요');
      navigate(ROUTE.ADMIN_STATS);
    } catch (error) {
      console.error(error);
      setToastMessage(`로그인에 실패했어요\n${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[40px] px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="text-center">
        <div className="flex items-center">
          <Title2 text="우" className="text-primary" />
          <Title2 text="리 " />
          <Title2 text="학" className="text-primary" />
          <Title2 text="교 " />
          <Title2 text="동" className="text-primary" />
          <Title2 text="아" />
          <Title2 text="리" />
        </div>
        <Title2 text="관리자 페이지" />
      </div>
      <form method="POST" onSubmit={handleLogin} className="flex flex-wrap items-center justify-center gap-[20px]">
        <div className="flex flex-col gap-[12px]">
          <Input
            type="text"
            label="아이디"
            placeholder="아이디"
            value={loginId}
            name="loginId"
            onChange={(e) => setLoginId(e.target.value)}
            className="w-[210px]"
          />
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[210px]"
          />
        </div>
        <Button text="로그인" className="w-[100px]" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default AdminLoginPage;
