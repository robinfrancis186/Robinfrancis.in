import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { finishRun, isPlayerId, leaderboard, playerName, startRun, validScore } from "../src/lib/jetpackLeaderboard.ts";

// Run with: node --experimental-strip-types scripts/test-jetpack.mjs
assert.equal(playerName("  Robin   Francis  "), "Robin Francis");
assert.equal(playerName("ആദിത്യ"), "ആദിത്യ");
assert.equal(playerName("O’Neil"), "O’Neil");
for (const name of [null, {}, " ", "x".repeat(25), "<script>", "Pilot\u202Eevil"]) {
    assert.equal(playerName(name), null);
}
const player = randomUUID();
assert.equal(isPlayerId(player), true);
assert.equal(isPlayerId("../../scores"), false);
assert.equal(validScore(450, 5000, 6000), true);
assert.equal(validScore(1000, 5000, 500000), true); // Paused time is not flight time.
for (const [score, duration, elapsed] of [
    [-1, 5000, 6000], [1.1, 5000, 6000], ["50", 5000, 6000],
    [NaN, 5000, 6000], [500000, 5000, 6000], [40, 0, 6000],
    [40, 60000, 6000], [40, 5000, 7200001], [40, 5000, -1],
]) assert.equal(validScore(score, duration, elapsed), false);

process.env.UPSTASH_REDIS_REST_URL = "https://redis.invalid";
process.env.UPSTASH_REDIS_REST_TOKEN = "test-only";
const originalFetch = globalThis.fetch;
const commands = [];
let run;
let result = 1;
globalThis.fetch = async (_url, options) => {
    const command = JSON.parse(options.body);
    commands.push(command);
    if (command[0] === "SET") {
        run = JSON.parse(command[2]);
        assert.equal(command[3], "EX");
        assert.equal(command[4], 7200);
        return Response.json({ result: "OK" });
    }
    if (command[0] === "GET") return Response.json({ result: run ? JSON.stringify(run) : null });
    return Response.json({ result });
};
try {
    const runId = await startRun(player, "Robin");
    assert.equal(isPlayerId(runId), true);
    assert.equal(run.player, player);
    assert.equal(run.name, "Robin");
    run.startedAt -= 6000;
    assert.equal(await finishRun(randomUUID(), runId, 450, 5000), false);
    assert.equal(commands.some(command => command[0] === "EVAL"), false);
    assert.equal(await finishRun(player, runId, 450, 5000), true);
    const save = commands.at(-1);
    assert.equal(save[2], 3);
    assert.deepEqual(save.slice(-3), [player, 450, 5000]);
    result = 0;
    assert.equal(await finishRun(player, runId, 999, 5000), false);
    run = null;
    assert.equal(await finishRun(player, runId, 450, 5000), false);
    result = [JSON.stringify({ name: "Robin", score: 450 })];
    assert.deepEqual(await leaderboard(), [{ name: "Robin", score: 450 }]);
    globalThis.fetch = async () => Response.json({ error: "storage failure" });
    await assert.rejects(leaderboard, /unavailable/);
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.KV_REST_API_TOKEN;
    await assert.rejects(leaderboard, /not configured/);
} finally {
    globalThis.fetch = originalFetch;
}
console.log("Jetpack checks passed: names, score bounds, ownership, expiry, storage failures and Redis request contracts.");
