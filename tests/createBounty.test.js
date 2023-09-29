const db = require("../config/db");
const { createBounty } = require("../services/bountyService");

jest.mock("../config/db");

describe("createBounty", () => {
    it("should insert a new bounty into the database", async () => {
        const repoLink = "https://github.com/user/repo";
        const issueDescription = "this is from jest";
        const user_id = 1;
        const bounty_amount = 100;

        const expectedSqlQuery = `INSERT INTO bounties VALUES (
        DEFAULT,
        ?,
        ?,
        DEFAULT,
        ?,
        ?
    )`;

        const expectedValues = [
            repoLink,
            issueDescription,
            user_id,
            bounty_amount,
        ];

        db.query.mockImplementation((query, values, callback) => {
            expect(query).toBe(expectedSqlQuery);
            expect(values).toEqual(expectedValues);
            callback(null, {});
        });

        const result = await createBounty(
            repoLink,
            issueDescription,
            user_id,
            bounty_amount
        );

        expect(result).toEqual({});
    });

    it("should throw an error if the database query fails", async () => {
        const repoLink = "https://github.com/user/repo";
        const issueDescription = "Fix a bug";
        const user_id = 1;
        const bounty_amount = 100;

        const expectedError = new Error("Database query failed");

        db.query.mockImplementation((query, values, callback) => {
            callback(expectedError);
        });

        await expect(
            createBounty(repoLink, issueDescription, user_id, bounty_amount)
        ).rejects.toThrow(expectedError);
    });
});
