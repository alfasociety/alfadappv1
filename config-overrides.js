const webpack = require('webpack');

module.exports = {
  webpack: (config, env) => {
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback, {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
    });

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ]);

    config.resolve.fallback = fallback;
    config.ignoreWarnings = [/Failed to parse source map/]; // gets rid of a billion source map warnings
    return config;
  },
};
