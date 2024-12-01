import { ReactElement } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import LoadingSpinner from '@components/LoadingSpinner';

type CustomPullToRefreshProps = {
  children: ReactElement;
  onRefresh: () => Promise<void>;
};

const CustomPullToRefresh = ({ children, onRefresh }: Readonly<CustomPullToRefreshProps>) => (
  <PullToRefresh
    onRefresh={onRefresh}
    pullingContent={
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    }
    refreshingContent={
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    }
  >
    <div className="h-full overflow-auto scrollbar-hide">{children}</div>
  </PullToRefresh>
);

export default CustomPullToRefresh;
