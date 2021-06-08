const { getSVG, genJSON, genPNG } = require("./lib");

test("should match snapshots", async () => {
  const svgs = getSVG("__test__/svgs");
  const png = await genPNG(svgs, "basic", 1);
  const json = await genJSON(svgs, "basic", 1);
  expect(svgs).toMatchSnapshot();
  expect(png).toMatchSnapshot();
  expect(json).toMatchSnapshot();
});
