import { readFileSync } from 'fs'

export class CommonPlatformTestData {
    constructor(dataset_name) {
        const rawData = readFileSync(`./tests/data/${dataset_name}.json`, "utf8")
        const content = JSON.parse(rawData)

        // Check if the file was read correctly
        if (!content) {
            throw new Error(`Dataset ${dataset_name} not found`)
        }

        this.content = content
    }
}
