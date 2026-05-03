import { jsx as _jsx } from "react/jsx-runtime";
export function LoadingFallback() {
    return (_jsx("div", { role: "status", "aria-live": "polite", className: "min-h-[40vh] flex items-center justify-center text-text-muted", children: _jsx("span", { className: "sr-only", children: "Loading\u2026" }) }));
}
