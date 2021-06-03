# @geolonia/more-sprites

A CLI to extend [sprites.geolonia.com](https://github.com/geolonia/sprites.geolonia.com) when you need any additional icons.
You can specify the SVG folder as the first argument, and it will receive the @1x and @2x sprite data in a zipped Buffer stream.

## usage

```shell
$ nvm use v10 # You can use any Node version manager
$ npx @geolonia/more-sprites ./svgs > ./icons.zip
$ unzip ./icons.zip
```
