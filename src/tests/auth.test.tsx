import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
// import { renderHook } from "@testing-library/react-hooks";
import useAuthRedirect from "@hooks/useAuthRedirect";

const mockNavigate = vi.fn();

vi.mock("@hooks/usePrefixedNavigate", () => ({
  default: () => mockNavigate,
}));

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

const MockComponent = () => {
  useAuthRedirect();
  return null;
};

describe("동아리 회원은 우학동 서비스를 이용하기 위해 학교 이메일로 구글 로그인을 할 수 있다.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("우학동 서비스에 가입되지 않았으면 loginRegister 페이지로 이동한다.", () => {
    localStorage.removeItem("accessToken");
    (useLocation as vi.Mock).mockReturnValue({ pathname: "/" });

    render(
      <MemoryRouter initialEntries={["/doit"]}>
        <MockComponent />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/loginRegister");
  });

  it("우학동 서비스에 가입되었지만 인적사항을 등록하지 않았으면 clubJoinOnboarding 페이지로 이동한다.", () => {});

  it("우학동 서비스에 가입되었고 인적사항을 등록했지만 결제를 하지 않았으면 clubJoinTempComplete 페이지로 이동한다.", () => {});

  it("우학동 서비스에 가입되었고 인적사항을 등록했고 결제도 했으면 동아리 전용 홈페이지로 이동한다.", () => {});
});
