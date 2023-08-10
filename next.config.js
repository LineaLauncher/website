/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false }
        config.externals.push("pino-pretty", "lokijs", "encoding")
        return config
    },
    plugins: [
        "autoprefixer",
        [
            "@fullhuman/postcss-purgecss",
            {
                content: ["./pages/**/*.js", "./components/**/*.js"],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: {
                    standard: ["html", "body"],
                    deep: [],
                    greedy: [],
                },
            },
        ],
    ],
}

module.exports = nextConfig
