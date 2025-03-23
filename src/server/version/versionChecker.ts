interface ResourceVersion {
    version: string;
    description: string;
    download: string;
}

interface Changelog {
    [version: string]: {
        changes: string[];
    };
}

interface Resource {
    homepage: string;
    latest: ResourceVersion;
    changelog: Changelog;
}

interface VersionData {
    [resourceName: string]: Resource;
}

class VersionChecker {
    private currentVersion: string;
    private versionUrl: string;
    private resourceName: string;

    constructor(currentVersion: string, versionUrl: string, resourceName: string) {
        this.currentVersion = currentVersion;
        this.versionUrl = versionUrl;
        this.resourceName = resourceName;
    }

    public async checkVersion(): Promise<void> {
        try {
            const response = await fetch(this.versionUrl);
            if (!response.ok) {
                throw new Error(`Error fetching version: ${response.statusText}`);
            }
            const data: VersionData = await response.json();
            const latestVersion = data[this.resourceName].latest.version;
            if (latestVersion !== this.currentVersion) {
                console.log(`New version available: ${latestVersion}. Current version: ${this.currentVersion}`);
                console.log('Please update the resource.');
            } else {
                console.log(`You are using the latest version: ${this.currentVersion}`);
            }
        } catch (error) {
            console.error('Error checking version:', error);
        }
    }
}
