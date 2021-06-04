#!/usr/bin/env node

const archiver = require("archiver");
const { getSVG, genJSON, genPNG } = require("./lib");

const inputPath = process.argv[2];

const main = async () => {
  const svgs = getSVG(inputPath);

  // generate x1 and x2
  const items = await Promise.all([
    genJSON(svgs, 1),
    genJSON(svgs, 2),
    genPNG(svgs, 1),
    genPNG(svgs, 2),
  ]);

  const archive = archiver.create("zip");
  archive.directory("icons/", false);
  items.forEach((item) =>
    archive.append(item.data, { name: `icons/${item.name}` })
  );
  archive.pipe(process.stdout);
  archive.finalize();
};

main();
