import MemberInfoWritePage from '@pages/member/MemberInfoWrite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@hooks/useCustomNavigate', () => ({
  default: () => vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => vi.fn(),
    useLocation: () => vi.fn(),
  };
});

vi.mock('@contexts/ToastContext', () => ({
  useToast: () => ({
    setToastMessage: vi.fn(),
  }),
}));

// US31
describe('동아리 회원은 우학동 서비스를 이용하기 위해 자신의 인적사항(학교, 이메일, 이름, 성별, 학과, 학번, 휴대폰 번호)을 입력할 수 있다.', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('인적사항을 입력한다.', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MemberInfoWritePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('남성'));
      fireEvent.change(screen.getByLabelText('휴대폰 번호'), { target: { value: '01012345678' } });
      fireEvent.change(screen.getByLabelText('학과'), { target: { value: '소프트웨어학과' } });
      fireEvent.change(screen.getByLabelText('학번'), { target: { value: '202123456' } });

      expect(screen.getByText('남성')).toHaveClass('text-primary');
      expect(screen.getByText('여성')).toHaveClass('text-gray');
      expect(screen.getByLabelText('휴대폰 번호')).toHaveValue('010-1234-5678');
      expect(screen.getByLabelText('학과')).toHaveValue('소프트웨어학과');
      expect(screen.getByLabelText('학번')).toHaveValue('202123456');
    });
  });
});
