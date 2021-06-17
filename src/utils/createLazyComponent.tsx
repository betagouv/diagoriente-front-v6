import React, { Suspense, lazy, ComponentType, ComponentProps } from 'react';
import Loader from 'components/Layout/loader/loader';

export default function <T extends ComponentType<any>>(path: () => Promise<{ default: T }>) {
  const Component = lazy(path);

  return function (props: ComponentProps<T>) {
    return (
      <Suspense fallback={<Loader />}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </Suspense>
    );
  };
}
