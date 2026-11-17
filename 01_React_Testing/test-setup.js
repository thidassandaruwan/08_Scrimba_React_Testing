import "@testing-library/jest-dom/vitest";
import { afterEach } from 'vitest'
import { cleanup } from "@testing-library/react";

// cleaup the dom after each test
afterEach(() => {
    cleanup();
});