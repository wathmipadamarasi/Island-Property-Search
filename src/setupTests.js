import "@testing-library/jest-dom";

// Mock react-dnd so Jest doesn't try to parse ESM from node_modules
jest.mock("react-dnd", () => ({
  DndProvider: ({ children }) => children,
  useDrag: () => [{}, () => {}],
  useDrop: () => [{}, () => {}],
}));

jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: {},
}));

