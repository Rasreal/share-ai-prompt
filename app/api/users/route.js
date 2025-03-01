export async function GET (req, res) {
    const users= [
        {id: 1, name: "Yersultan"},
        {id: 2, name: "Alan"},
        {id: 3, name: "Almat"},
    ];

    return new Response(JSON.stringify(users));
}