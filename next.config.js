const compiler = {};
if (process.env.NODE_ENV === "production") {
  compiler.removeConsole = {
    exclude: ["error"],
  };
}

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler,
  trailingSlash: true,
};

module.exports = moduleExports;

