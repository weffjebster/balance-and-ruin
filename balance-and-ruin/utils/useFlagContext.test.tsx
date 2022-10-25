// import { renderHook, act } from '@testing-library/react';
// import { useFlagContext, useFlag } from './useFlagContext';
// import { FlagContext } from './FlagProvider';

// describe(`wow`, () => {
//   it('works', () => {
//     expect(true).toBe(true);
//     const flags = {};
//     const metadata = {};
//     const setFlags = jest.fn();

//     const { result } = renderHook(() => useFlagContext(), {
//       wrapper: ({ children }) => (
//         <FlagContext.Provider value={{ setFlags, flags, metadata }}>{children}</FlagContext.Provider>
//       )
//     });

//     const target = {
//       key: '--foo',
//       value: 'isup'
//     };
//     result.current.setFlags({
//       foo: target
//     });

//     expect(setFlags).toHaveBeenCalledWith({ foo: target });
//   });
// });
