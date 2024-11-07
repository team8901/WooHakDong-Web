import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { postPortOne } from '@libs/api/payment';
import { MemoryRouter } from 'react-router-dom';
import PaymentPage from '@pages/payment';
import ROUTE from '@libs/constant/path';

const mockNavigate = vi.fn();

vi.mock('@hooks/useCustomNavigate', () => ({
  default: () => mockNavigate,
}));

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('@libs/api/payment', () => ({
  postPortOne: vi.fn(),
}));

// US36
describe('동아리 회원은 서비스에 연결된 은행 api를 통해 회비를 납부할 수 있다.', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('결제에 성공한 경우', async () => {
    // postPortOne이 성공적으로 호출되도록 설정
    (postPortOne as Mock).mockResolvedValueOnce('동아리 가입이 완료되었습니다.');

    render(
      <MemoryRouter initialEntries={['/doit/payment']}>
        <PaymentPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('결제하기'));

    // postPortOne이 호출되었는지 확인
    await waitFor(() => {
      expect(postPortOne).toHaveBeenCalled();
    });

    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.ROOT);
  });
});
