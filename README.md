# @geolonia/more-sprites

A CLI to extend [sprites.geolonia.com](https://github.com/geolonia/sprites.geolonia.com) when you need additional icons.

You can specify the SVG folder as the first argument, and it will receive the @1x and @2x sprite data in a zipped Buffer stream.

## usage example

```shell
$ nvm use v10 # This package depends on Node v10
$ npm install -g @geolonia/more-sprites
$ npx more-sprites ./svgs > ./icons.zip
$ unzip ./icons.zip
```

## License

For more information about icon licensing, please see https://sprites.geolonia.com.
