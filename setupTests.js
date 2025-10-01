import '@testing-library/jest-dom';

const MESSAGES_TO_IGNORE = [
  'An update to App inside a test was not wrapped in act(',
  'When testing, code that causes React state updates should be wrapped into act(',
  'The above error occurred',
  'Error:'
];

const originalError = console.error.bind(console);

console.error = (...args) => {
  const shouldIgnore = MESSAGES_TO_IGNORE.some(msg =>
    args.some(a => String(a).includes(msg))
  );
  if (!shouldIgnore) originalError(...args);
};

let ResizeObserverBackup;

if (typeof window !== 'undefined') {
  ResizeObserverBackup = window.ResizeObserver;
}

beforeEach(() => {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  }
});

afterEach(() => {
  if (typeof window !== 'undefined') {
    window.ResizeObserver = ResizeObserverBackup;
  }
  jest.restoreAllMocks();
});

jest.setTimeout(30000);