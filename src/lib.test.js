const { getSVG, genJSON, genPNG } = require("./lib");

test("should match snapshots", async () => {
  const svgs = getSVG("__test__/svgs");
  const png = await genPNG(svgs, "basic", 1);
  const json = await genJSON(svgs, "basic", 1);
  expect(svgs).toMatchSnapshot();
  expect(png).toMatchSnapshot();
  expect(json).toMatchSnapshot();
});

test("should convert multibyte chars.", async () => {
  const fs = require("fs");
  const path = require("path");
  const filename = fs.readdirSync("__test__/mb_svgs")[0];
  const { name } = path.parse(filename);
  console.log(1, encodeURIComponent(name[1]));
  const svgs = await getSVG("__test__/mb_svgs");
  const { id } = svgs.filter((svg) => svg.id[0] === "揚")[0];
  console.log(2, encodeURIComponent(id[1]));
  const { data: json } = await genJSON(svgs, "basic", 1);
  const key = Object.keys(JSON.parse(json)).filter((key) => key[0] === "揚")[0];
  console.log(3, encodeURIComponent(key[1]));
});
