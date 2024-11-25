import ROUTE from '@libs/constant/path';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { getClubInfo } from '@libs/api/club';
import ClubItemDetailPage from '@pages/clubItem/ClubItemDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@libs/api/club', () => ({
  getClubInfo: vi.fn(),
}));

const mockItem = {
  itemId: 0,
  itemName: '27인치 모니터',
  itemPhoto: '/logo.svg',
  itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
  itemLocation: '동아리 방',
  itemCategory: 'DIGITAL',
  itemRentalMaxDay: 0,
  itemAvailable: true,
  itemUsing: false,
  itemRentalDate: '2024-10-29T05:56:14.799Z',
  itemRentalTime: 0,
};

const renderComponent = (state = {}) => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        initialEntries={[
          {
            pathname: `${ROUTE.CLUB}/doit${ROUTE.ITEM}/${mockItem.itemId}`,
            state: { item: mockItem, ...state },
          },
        ]}
      >
        <Routes>
          <Route path={`${ROUTE.CLUB}/:clubEnglishName${ROUTE.ITEM}/:itemId`} element={<ClubItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('ClubItemDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getClubInfo as Mock).mockResolvedValue({ clubId: 1 });
  });

  it('누가 사용하지 않고 있고 이용가능한 물품의 경우 대여하기 버튼이 표시된다.', () => {
    renderComponent();

    expect(screen.getByText('대여하기')).toBeInTheDocument();
  });

  it('대여하기 버튼을 누르면 반납하기 버튼이 표시된다.', () => {
    renderComponent({ borrowedReturnDate: '2023-09-17T16:00:00Z' });

    expect(screen.getByText('반납하기')).toBeInTheDocument();
  });

  it('반납을 완료하면 반납 완료 버튼이 표시된다.', () => {
    renderComponent();
    fireEvent.click(screen.getByText('대여하기'));

    waitFor(() => {
      expect(screen.getByText('반납하기')).toBeInTheDocument();
      fireEvent.click(screen.getByText('반납하기'));
      expect(screen.getByText('반납 완료')).toBeInTheDocument();
    });
  });

  it('물품이 이용가능하지 않으면 대여 불가 버튼이 표시된다.', () => {
    renderComponent({ item: { ...mockItem, itemAvailable: false } });

    expect(screen.getByText('대여 불가')).toBeInTheDocument();
  });

  it('누가 물품을 사용 중이면 대여 중 버튼이 표시된다.', () => {
    renderComponent({ item: { ...mockItem, itemUsing: true } });

    expect(screen.getByText('대여 중')).toBeInTheDocument();
  });
});
