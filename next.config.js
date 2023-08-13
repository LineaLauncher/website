/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    // skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
})

const nextConfig = withPWA({
    webpack: config => {
        config.resolve.fallback = { fs: false, net: false, tls: false }
        config.externals.push("pino-pretty", "lokijs", "encoding")
        return config
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: "/v0/b/linealauncher-production.appspot.com/**",
            },
        ],
    },
})

module.exports = nextConfig
