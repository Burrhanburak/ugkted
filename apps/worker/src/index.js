/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx) {
        if (request.method === "POST") {
            const body = await request.json();
            // Example: Process a webhook or background job
            console.log("Received background task:", body);

            return new Response("Task processed", { status: 200 });
        }
        return new Response("Hello World from UGKTED Worker!", { status: 200 });
    },
};
