/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
