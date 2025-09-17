import { headers } from "next/headers";

export async function getVercelGeoHeaders() {
    const h = await headers();

    const getDecoded = (name: string) => {
        const value = h.get(name);
        return value ? decodeURIComponent(value) : null;
    };

    return {
        country: getDecoded("x-vercel-ip-country"),
        region: getDecoded("x-vercel-ip-country-region"),
        city: getDecoded("x-vercel-ip-city"),
    };
}