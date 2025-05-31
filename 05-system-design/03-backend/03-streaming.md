# Streaming

Streaming back partial responses to the client from an AI service is so hot righ now.
For example, OpenAI provides this capability with server-sent events,

```js
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();
```

Parsing Server-sent events is non-trivial, simple strategies like splitting by a new line may result in parsing errors.
Using existing client libraries for this is recommended.
