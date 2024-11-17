import LoadingSpinner from '@components/LoadingSpinner';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

type PullToRefreshProps = {
  children: ReactNode;
  onRefresh: () => void;
  maxDistance?: number;
  loadingComponent?: ReactNode;
};

const PullToRefresh = ({
  children,
  onRefresh,
  maxDistance = 70,
  loadingComponent = <LoadingSpinner />,
}: Readonly<PullToRefreshProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [pulled, setPulled] = useState(false);

  useEffect(() => {
    const touchMoveListener = (e: TouchEvent) => {
      if (!isTouch || !pulled) return;

      onMove(e.touches[0].clientY);
      e.preventDefault();
    };

    document.addEventListener('touchmove', touchMoveListener, { passive: false });

    return () => {
      document.removeEventListener('touchmove', touchMoveListener);
    };
  }, [isTouch, pulled]);

  const resetToInitial = () => {
    setPulled(false);
    setIsRefreshing(false);

    if (!spinnerRef.current) return;

    spinnerRef.current.style.height = '0';
    spinnerRef.current.style.willChange = 'unset';
  };

  const onStart = (y: number, touch: boolean) => {
    setStartY(y);
    setIsTouch(touch);
    setPulled(true);

    if (!spinnerRef.current) return;

    spinnerRef.current.style.willChange = 'height';
  };

  const onMove = (y: number) => {
    if (!pulled || !spinnerRef.current) return;

    const moveY = y;
    const pulledDistance = Math.min(Math.pow(moveY - startY, 0.875), maxDistance);

    if (pulledDistance <= 0) {
      resetToInitial();
      return;
    }

    spinnerRef.current.style.height = `${pulledDistance}px`;

    if (pulledDistance >= maxDistance) {
      setIsRefreshing(true);
      return;
    }

    setIsRefreshing(false);
  };

  const handleEnd = () => {
    if (!isTouch || !pulled) return;

    onEnd();
  };

  const onEnd = async () => {
    if (!pulled) return;

    if (!isRefreshing) {
      resetToInitial();
      return;
    }

    try {
      await onRefresh();
      await new Promise((resolve) => {
        setTimeout(resolve, 500); // 최대 1초까지 기다림
      });

      resetToInitial();
    } catch (error) {
      console.error('Error while refreshing:', error);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || containerRef.current.scrollTop !== 0) return;

    onStart(e.touches[0].clientY, true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || containerRef.current.scrollTop !== 0) return;

    onStart(e.clientY, false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !pulled) return;

    onMove(e.clientY);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    if (isTouch) return;

    onEnd();
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleEnd}
      className="h-full overflow-y-auto scrollbar-hide"
    >
      <div ref={spinnerRef} className="flex justify-center">
        {isRefreshing && loadingComponent}
      </div>
      {children}
    </div>
  );
};

export default PullToRefresh;
