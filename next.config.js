module.exports = {
  reactStrictMode: true,
  
  experimental: {
    scrollRestoration: false
  },

  images: {
    domains: ['localhost', 'lostpropertyhotel.com', 'curio.greenwich-design-projects.co.uk', 'content.lostpropertyhotel.com'],
  },

  trailingSlash: true,

  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en' 
  },
  
  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
