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

jest.setTimeout(30000);