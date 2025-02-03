declare global {
    interface Window {
        __TAURI__?: {
            tauri: {
                invoke: (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;
            };
        };
    }
}

export {};
