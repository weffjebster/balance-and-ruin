import { renderHook } from '@testing-library/react';
import { useFlagContext } from './useFlagContext';
import { FlagContext } from './FlagProvider';

describe(`wow`, () => {
  it('works', () => {
    expect(true).toBe(true);
    const flags = {};
    const metadata = {};
    const setFlags = jest.fn();

    const { result } = renderHook(() => useFlagContext(), {
      wrapper: ({ children }) => (
        <FlagContext.Provider value={{ setFlags, defaultFlags: flags, metadata }}>
          {children}
        </FlagContext.Provider>
      )
    });

    result.current.setFlags({
      foo: 'isup'
    });

    expect(setFlags).toHaveBeenCalledWith({ foo: 'isup' });
  });
});
