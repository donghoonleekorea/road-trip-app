import { getAllCamprounds, getCampgroundById } from '../Services';


describe('API Call Services Test', () => {
  describe('getAllCampgrounds', () => {
    test('Should return array', async () => {
      const result = await getAllCamprounds();
      expect(typeof result).toBe(typeof []);
    });
    test('Each campground to have 5 fields', async () => {
      const result = await getAllCamprounds();
      expect(Object.keys(result[0])).toHaveLength(5);
    });
  });
  //not working properly
  describe('getCampgroundById', () => {
    test('Posting a campground to be a success', async () => {
      const result = await getCampgroundById('6333f176303527ee323afb2f');
      expect(`/campgrounds/${result}`).toBe('/campgrounds/6333f176303527ee323afb2f')
    })
  })
});


