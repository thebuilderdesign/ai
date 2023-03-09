// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ["oaidalleapiprodscus.blob.core.windows.net", "localhost"]
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */




const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
 
}

module.exports = {...nextConfig,
images: {
  domains: ['gateway.pinata.cloud',"oaidalleapiprodscus.blob.core.windows.net", "localhost"],
},

}
