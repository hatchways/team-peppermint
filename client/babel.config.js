module.exports = {
  presets: [
    "@babel/react",
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
};
