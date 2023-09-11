"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HLS = void 0;
class HLS {
}
exports.HLS = HLS;
HLS.get = (m3u8) => {
    try {
        const segments = [];
        let key = {
            method: "NONE",
        };
        let duration = 0;
        let allDuration = 0.0;
        const lines = m3u8
            .replace(/\r\n/g, "\n")
            .split("\n")
            .filter((el) => el.trim() != "");
        for (const line of lines) {
            if (line[0] === "#") {
                if (line.includes("#EXTM3U") ||
                    line.includes("#EXT-X-VERSION") ||
                    line.includes("#EXT-X-TARGETDURATION") ||
                    line.includes("#EXT-X-ALLOW-CACHE") ||
                    line.includes("#EXT-X-PLAYLIST-TYPE") ||
                    line.includes("#EXT-X-MEDIA-SEQUENCE") ||
                    line.includes("#EXT-X-ENDLIST")) {
                    continue;
                }
                if (line.includes("#EXT-X-KEY")) {
                    if (line.split("METHOD=")[1] == "NONE") {
                        key = { method: "NONE", uri: undefined };
                    }
                    else {
                        key = {
                            method: "AES-128",
                            uri: line.split("URI=")[1].replace(/"/g, ""),
                        };
                    }
                    continue;
                }
                if (line.includes("#EXTINF")) {
                    duration = Number(line.split(":")[1].split(",")[0]);
                    continue;
                }
                console.log("HLS ERROR", "NEW HEADER", line);
            }
            segments.push({
                key,
                duration,
                uri: line,
            });
            allDuration += duration;
        }
        return { segments, duration: Number(allDuration.toFixed(2)) };
    }
    catch (e) {
        throw e;
    }
};
