/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
const mockRender = jest.fn();
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({ render: mockRender })),
}));
jest.mock('../config/axios-config', () => ({
  setup: jest.fn(),
}));
// The real app is not needed to check how the root is created.
jest.mock('./App', () => ({
  __esModule: true,
  default: () => null,
}));

// Loads the renderer entry in a fresh module registry, and returns the mocks it used.
const loadRenderer = () => {
  let axiosSetup: jest.Mock | undefined;
  let createRootMock: jest.Mock | undefined;
  jest.isolateModules(() => {
    require('./index');
    axiosSetup = require('../config/axios-config').setup;
    createRootMock = require('react-dom/client').createRoot;
  });
  return { axiosSetup, createRootMock };
};

describe('Renderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('should set up axios and render the app in the root element', () => {
    const { axiosSetup, createRootMock } = loadRenderer();

    expect(axiosSetup).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(
      document.getElementById('root')
    );
    expect(mockRender).toHaveBeenCalledTimes(1);
  });

  it('should fail clearly when the root element is missing', () => {
    document.body.innerHTML = '';

    expect(loadRenderer).toThrow('The root element was not found');
  });
});
