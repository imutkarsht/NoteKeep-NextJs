export { auth as middleware } from "@/auth";
export const config = {
    matcher: "/:path*",
    runtime: "nodejs",
    unstable_allowDynamic: [
        
        "/src/lib/db.js",
        "/node_modules/mongoose/dist/**",
    ],
};