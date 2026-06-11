import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '..', 'data');

export class CommonPlatformTestData {
    constructor(datasetName) {
        const filePath = path.join(dataDir, `${datasetName}.json`);
        const rawData = readFileSync(filePath, 'utf8');
        const content = JSON.parse(rawData);

        // Check if the file was read correctly
        if (!content) {
            throw new Error(`Dataset ${datasetName} is empty or invalid`);
        }

        this.content = content;
    }
}
