const { app } = require('@azure/functions');

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';
        const greeting = "Hello";
        if (name == 'mike') { greeting = "Howdy" }
        if (name == 'joe') { greeting = "Yo" }
        if (name == 'mel') { greeting = "Sup" }

        return { body: JSON.stringify({ "text": `${greeting} ${name}, from the API!` }) };
    }
});