import { MetadataRoute } from "next"
 
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://linealauncher.com/projects",
            lastModified: new Date(),
        },
        {
            url: "https://linealauncher.com/apply",
            lastModified: new Date(),
        },
        {
            url: "https://linealauncher.com/demo",
            lastModified: new Date(),
        },
        {
            url: "https://linealauncher.com/staking",
            lastModified: new Date(),
        },
    ]
}