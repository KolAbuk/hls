# @kolabuk/hls

m3u8 file parser

## Importing

```javascript
import { HLS } from "@kolabuk/hls";
```

## Usage

```javascript
const hls = HLS.get(`
    #EXTM3U
    #EXT-X-VERSION:3
    #EXT-X-TARGETDURATION:21
    #EXT-X-ALLOW-CACHE:YES
    #EXT-X-PLAYLIST-TYPE:VOD
    #EXT-X-MEDIA-SEQUENCE:0...
`);
```

Response example

```json
{
  "segments": [
    {
      "key": {
        "method": "AES-128",
        "uri": "https://example.com/key.pub"
      },
      "duration": 3,
      "uri": "seg0.ts"
    },
    {
      "key": { "method": "NONE" },
      "duration": 19.992,
      "uri": "seg1.ts"
    }
  ],
  "duration": 22.99
}
```
