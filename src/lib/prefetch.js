// utils/prefetch.js

export const prefetchRouteData = (route) => {
    switch (route) {
        case "messages":
            import("@/pages/Messages"); // Lazy loading the component
            break;
        case "connections":
            import("@/pages/Connections");
            break;
        case "profile":
            import("@/pages/Profile");
            break;
        case "contact":
            import("@/pages/Contact");
            break;
        default:
            break;
    }
};
