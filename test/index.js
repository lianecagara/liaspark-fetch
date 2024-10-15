const LiaSpark = require(process.cwd());

async function main() {
    const ai = new LiaSpark("bestgpt");
    const answer = await ai.ask("Who are you?", "Althea Ferrer");
    console.log(answer);
    console.log(await ai.getInfo());
}

main();