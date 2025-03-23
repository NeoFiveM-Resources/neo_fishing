const fs = require("fs");
const path = require("path");

// Function to extract resource name from fxmanifest.lua
function getResourceName() {
    const fxManifestPath = path.join(__dirname, "../fxmanifest.lua");
    if (!fs.existsSync(fxManifestPath)) {
        console.error("⚠ fxmanifest.lua not found!");
        return null;
    }

    const fxManifestContent = fs.readFileSync(fxManifestPath, "utf8");
    const match = fxManifestContent.match(/name\s+['"](.+?)['"]/);

    return match ? match[1] : null;
}

// Get the resource name dynamically
const resourceName = getResourceName();
if (!resourceName) {
    console.error("⚠ Resource name not found in fxmanifest.lua!");
    process.exit(1);
}

console.log(`✅ Detected resource: ${resourceName}`);

// Path to external versions.json file
const repoPath = "external-repo"; // Change if needed
const versionFile = path.join(repoPath, "versions.json");

// Read versions.json
let data;
try {
    data = JSON.parse(fs.readFileSync(versionFile, "utf8"));
} catch (error) {
    console.error("❌ Error reading versions.json:", error);
    process.exit(1);
}

// Get GitHub repo URL
const repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repoName = process.env.GITHUB_REPOSITORY;
const repoUrl = `https://github.com/${repoOwner}/${repoName}/commit/`;

// Read commit messages with commit IDs
const commitMessages = fs.readFileSync("changelog_updates.txt", "utf8")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => {
        const [commitId, ...messageParts] = line.split(" - ");
        const message = messageParts.join(" - ");
        return {
            commitId,
            message,
            link: `${repoUrl}${commitId}`
        };
    });

const latestVersion = process.env.RELEASE_VERSION || "unknown";

// If the resource doesn't exist, create it
if (!data[resourceName]) {
    console.log(`🆕 Resource "${resourceName}" not found. Creating a new entry.`);
    data[resourceName] = {
        "homepage": "",
        "latest": {
            "version": latestVersion,
            "description": `New release: ${latestVersion}`,
            "download": ""
        },
        "changelog": {}
    };
}

// Update latest version info
data[resourceName]["latest"]["version"] = latestVersion;

// Ensure the changelog entry exists
if (!data[resourceName]["changelog"][latestVersion]) {
    data[resourceName]["changelog"][latestVersion] = {"changes": []};
}

// Prevent duplicate commits in changelog
const existingChanges = data[resourceName]["changelog"][latestVersion]["changes"].map(c => c.commitId);
const newChanges = commitMessages.filter(entry => !existingChanges.includes(entry.commitId));

if (newChanges.length > 0) {
    data[resourceName]["changelog"][latestVersion]["changes"].push(...newChanges);
    console.log(`✅ Added ${newChanges.length} new changes to ${resourceName} - ${latestVersion}`);
} else {
    console.log("🔹 No new commit messages to add.");
}

// Write the updated JSON back to file
fs.writeFileSync(versionFile, JSON.stringify(data, null, 4));

console.log(`✅ Updated versions.json for ${resourceName}, version ${latestVersion}.`);
