// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { JSDOM } from 'jsdom';

let windowSpy: any;
beforeEach(() => {
    windowSpy = jest.spyOn(global as any, 'window', 'get');
});
afterEach(() => {
    windowSpy.mockRestore();
});

describe('', () => {
    it ('', () => {
        const { window } = new JSDOM();
        windowSpy.mockImplementation(() => window);
        // now you have `window` in test environment
    });
});
window.URL.createObjectURL = function() {};
