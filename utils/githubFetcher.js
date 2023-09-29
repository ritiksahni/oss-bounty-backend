const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

// Data: data.name, data.owner.login, description, data.language

function parseGithubUrl(githubUrl) {
    let splitUrl = new URL(githubUrl).pathname.split("/");
    splitUrl = splitUrl.filter((item) => item !== ""); // remove empty strings

    return { owner: splitUrl[0], repoName: splitUrl[1] };
}

async function getRepoData(repoOwner, repoName) {
    const data = {};
    const repoData = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: repoOwner,
        repo: repoName,
        headers: {
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });

    data["name"] = repoData.data.name;
    data["owner"] = repoData.data.owner.login;
    data["description"] = repoData.data.description;
    data["language"] = repoData.data.language;

    return data;
}

module.exports = { parseGithubUrl, getRepoData };
