#!/usr/bin/env node

const meow = require("meow");
const archiver = require("archiver");
const { getSVG, genJSON, genPNG } = require("./lib");

const name = process.argv[2];
const inputPath = process.argv[3];

if (!name || !inputPath) {
  process.stderr.write(`Invalid name and inputPath: ${name}, ${inputPath}`);
  process.exit(1);
}

const main = async () => {
  const svgs = getSVG(inputPath);

  // generate x1 and x2
  const items = await Promise.all([
    genJSON(svgs, name, 1),
    genJSON(svgs, name, 2),
    genPNG(svgs, name, 1),
    genPNG(svgs, name, 2),
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
