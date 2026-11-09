import electronHelper from './electron';

describe('Electron helper', () => {
  const ipcRenderer = {
    closeApp: jest.fn(),
    fullScreenApp: jest.fn(),
    maximizeApp: jest.fn(),
    minimizeApp: jest.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(window, 'electron', {
      value: { ipcRenderer },
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['closeApp'],
    ['fullScreenApp'],
    ['maximizeApp'],
    ['minimizeApp'],
  ] as const)('should forward %s to the main process', (name) => {
    ipcRenderer[name].mockReturnValue('result');

    expect(electronHelper[name]()).toBe('result');
    expect(ipcRenderer[name]).toHaveBeenCalledTimes(1);
  });
});
