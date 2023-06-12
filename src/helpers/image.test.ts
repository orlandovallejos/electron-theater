/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import imageHelper from './image';

describe('Image helper', () => {
  it('should set the base url', () => {
    const url = 'www.url.com/';
    const baseURL = imageHelper.setBaseURL({ url });
    expect(baseURL).toBe(url);
  });

  it('should get a backdrop image url', () => {
    const size = 'w1280';
    const url = 'www.url.com/';
    const backdropURL = '/image.jpg';
    const baseURL = imageHelper.setBaseURL({ url });
    const backdrop = imageHelper.getBackdropImage(backdropURL);
    expect(backdrop).toBe(`${baseURL}${size}${backdropURL}`);
  });
});
