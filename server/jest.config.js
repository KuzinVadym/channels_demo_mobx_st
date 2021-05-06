module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '__helpers__',
    '/node_modules/',
    '/factories/',
    '/support/',
    'setup',
    '.git',
  ],
}
