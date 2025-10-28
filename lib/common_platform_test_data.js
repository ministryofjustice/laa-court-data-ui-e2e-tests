import { readFileSync } from 'fs'

export class CommonPlatformTestData {
    constructor(datasetName) {
        const rawData = readFileSync(`./tests/data/${datasetName}.json`, "utf8")
        const content = JSON.parse(rawData)

        // Check if the file was read correctly
        if (!content) {
            throw new Error(`Dataset ${datasetName} not found`)
        }

        this.content = content
    }
}
