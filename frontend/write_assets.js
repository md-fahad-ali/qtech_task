const fs = require('fs');

const data = JSON.parse(fs.readFileSync('/Users/macm1/.gemini/antigravity/brain/b2443958-cf65-4c78-a16e-f8a2548720a0/.system_generated/steps/450/output.txt', 'utf8'));

if (data.success && data.result) {
    if (data.result.manBase64) {
        fs.writeFileSync('/Users/macm1/Desktop/qtech/public/assets/hero-man-v2.png', Buffer.from(data.result.manBase64, 'base64'));
        console.log('Wrote hero-man-v2.png');
    }
    if (data.result.patternBase64) {
        fs.writeFileSync('/Users/macm1/Desktop/qtech/public/assets/hero-bg-v2.png', Buffer.from(data.result.patternBase64, 'base64'));
        console.log('Wrote hero-bg-v2.png');
    }
} else {
    console.error('Data not found or not successful', data);
}
