import request from "supertest";
import app from "../index";


describe("Test campground.controller.ts", () => {
  it("Catch-all campgrounds", async () => {
    const res = await request(app).get("/campgrounds");
    expect(200)
  });
  it('should return campground by id', async () => {
    const res = await request(app).get("/campgrounds/63371e455d284d1d1c34beb8");
    expect(res.body).toEqual(testCampground)
  })
});

const testCampground = {
    location: {
      longitude: "10000",
      latitude: "999999"
    },
    _id: "63371e455d284d1d1c34beb8",
    name: "test",
    description: "test",
    image: "pathtest",
    __v: 0
};