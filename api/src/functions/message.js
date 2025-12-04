const { app } = require('@azure/functions');

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const greetings = new Map([
            ["mike", "Howdy"],
            ["joe", "Yo"],
            ["mel", "Sup"]
        ]);
        const name = request.query.get('name') || await request.text() || 'world';
        const greeting = greetings.has(name) ? greetings.get(name) : "Hello";

        return { body: JSON.stringify({ "text": `${greeting} ${name}, from the API!` }) };
    }
});