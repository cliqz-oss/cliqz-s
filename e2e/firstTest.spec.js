describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have urlbar', async () => {
    await expect(element(by.id('UrlBar'))).toBeVisible();
  });
})
