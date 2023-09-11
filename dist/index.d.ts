export declare type segment = {
    key: {
        method: "NONE" | "AES-128";
        uri?: string;
    };
    duration: number;
    uri: string;
};
export declare class HLS {
    static get: (m3u8: string) => {
        segments: segment[];
        duration: number;
    };
}
