const { getSVG, genJSON, genPNG } = require("./lib");

test("should match snapshots", () => {
  const svgs = getSVG("__test__/svgs");
  const pngs = genPNG(svgs, "basic", 1);
  const jsons = genJSON(svgs, "basic", 1);
  expect(svgs).toMatchSnapshot();
  expect(pngs).toMatchSnapshot();
  expect(jsons).toMatchSnapshot();
});
