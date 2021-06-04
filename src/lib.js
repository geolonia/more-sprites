const spritezero = require("@mapbox/spritezero");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

/**
 *
 * @param {string} inputPath
 * @returns
 */
const getSVG = (inputPath) => {
  const defaultSvgsPath = path.resolve(
    __dirname,
    "node_modules",
    "sprites.geolonia.com",
    "src",
    "*.svg"
  );

  return [
    ...glob.sync(defaultSvgsPath),
    ...glob.sync(path.resolve(inputPath, "*.svg")),
  ].map((f) => {
    return {
      svg: fs.readFileSync(f),
      id: path.basename(f).replace(".svg", ""),
    };
  });
};

/**
 *
 * @param {number} pxRatio
 * @returns { name: string, data: string }
 */
const genJSON = (svgs, pxRatio) => {
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

/**
 *
 * @param {number} pxRatio
 * @returns { name: string, data: Buffer }
 */
const genPNG = (svgs, pxRatio) => {
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

module.exports = { getSVG, genPNG, genJSON };
