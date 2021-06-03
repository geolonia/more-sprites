#!/usr/bin/env node

const spritezero = require("@mapbox/spritezero");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const archiver = require("archiver");

const inputPath = process.argv[2];
const defaultSvgsPath = path.resolve(
  __dirname,
  "node_modules",
  "sprites.geolonia.com",
  "src",
  "*.svg"
);

const svgs = [
  ...glob.sync(defaultSvgsPath),
  ...glob.sync(path.resolve(inputPath, "*.svg")),
].map((f) => {
  return {
    svg: fs.readFileSync(f),
    id: path.basename(f).replace(".svg", ""),
  };
});

const genJSON = (pxRatio) => {
  let file = "";
  if (pxRatio > 1) {
    file = `@${pxRatio}x`;
  }
  return new Promise((resolve, reject) => {
    spritezero.generateLayout(
      { imgs: svgs, pixelRatio: pxRatio, format: true },
      (error, dataLayout) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            name: `basic${file}.json`,
            data: JSON.stringify(dataLayout),
          });
        }
      }
    );
  });
};

const genPNG = (pxRatio) => {
  let file = "";
  if (pxRatio > 1) {
    file = `@${pxRatio}x`;
  }
  return new Promise((resolve, reject) => {
    spritezero.generateLayout(
      { imgs: svgs, pixelRatio: pxRatio, format: false },
      (error1, imageLayout) => {
        if (error1) {
          reject(error1);
        } else {
          spritezero.generateImage(imageLayout, (error2, image) => {
            if (error2) {
              reject(error2);
            } else {
              resolve({ name: `basic${file}.png`, data: image });
            }
          });
        }
      }
    );
  });
};

// generate x1 and x2
Promise.all([genJSON(1), genJSON(2), genPNG(1), genPNG(2)]).then((items) => {
  const archive = archiver.create("zip");
  archive.directory("icons/", false);
  items.forEach((item) => {
    console.log(item);
    archive.append(item.data, { name: `icons/${item.name}` });
  });
  archive.pipe(process.stdout);
  archive.finalize();
});
