import { renderHook } from '@testing-library/react';
import { FlagContext } from './FlagProvider';
import { useFlagGroupSelect } from './useFlagGroupSelect';
import metadata from '../pages/api/flag-metadata.json';

describe(useFlagGroupSelect, () => {
  it('properly calls underlying setFlags ', () => {
    expect(true).toBe(true);
    const flags = {};
    const setFlags = jest.fn();

    const { result } = renderHook(() => useFlagGroupSelect('Game Mode'), {
      wrapper: ({ children }) => (
        <FlagContext.Provider value={{ setFlags, defaultFlags: flags, metadata }}>
          {children}
        </FlagContext.Provider>
      )
    });
    const { options } = result.current;
    result.current.setValue(options[0]);
    expect(setFlags).toHaveBeenCalledTimes(1);
    expect(setFlags).toHaveBeenCalledWith({ 'Game Mode': '-open' });

    result.current.setValue(options[1]);
    expect(setFlags).toHaveBeenCalledTimes(2);
    expect(setFlags).toHaveBeenCalledWith({ 'Game Mode': '-cg' });
  });
});
