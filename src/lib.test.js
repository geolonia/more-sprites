const { getSVG, genJSON, genPNG } = require("./lib");

describe("should match snapshots", () => {
  const svgs = getSVG("__test__/svgs");

  it("should match svg snapshot", () => {
    expect(svgs).toMatchSnapshot();
  });

  it("should match png snapshot", async () => {
    const png = await genPNG(svgs, "basic", 1);
    expect(png).toMatchSnapshot();
  });

  it("should match json snapshot", async () => {
    const json = await genJSON(svgs, "basic", 1);
    expect(json).toMatchSnapshot();
  });
});
