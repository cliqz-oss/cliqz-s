/* eslint-env detox/detox, jest */

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render first screen', async () => {
    await expect(element(by.id('Drawer'))).toBeVisible();
  });
});
