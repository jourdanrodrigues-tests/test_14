import { useMemo } from 'react';

import { useNavigate } from 'react-router-dom'; // eslint-disable-line @typescript-eslint/no-restricted-imports

type Routes = typeof routes;
type Navigator = {
  [K in keyof Routes]: (...args: Parameters<Routes[K]>) => void;
} & { back: () => void };

export const routes = {
  home: () => '/home/',
  exerciseOne: () => '/exerciseOne/',
  exerciseTwo: () => '/exerciseTwo/',
};

export function useNavigator(): Navigator {
  const navigate = useNavigate();
  return useMemo(() => {
    const navigator = Object.entries(routes).reduce(
      (output, [key, method]) => ({
        ...output,
        // @ts-expect-error - Not sure how to type these arguments, they should just be forwarded
        [key]: (...args) => navigate(method(...args)),
      }),
      {} as Navigator
    );
    return { ...navigator, back: () => navigate(-1) };
  }, [navigate]);
}
