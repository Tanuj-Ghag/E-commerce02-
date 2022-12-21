// function testmongo(){
const { MongoClient } = require('mongodb');

async function main(){
    console.log("Hello");
    const uri = "mongodb+srv://Tanuj:agkmkb@cluster0.nmkyp6j.mongodb.net/Username?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await client.db('dbtest').collection('collection1').insertMany([
        {
        item: 'journal',
        qty: 25,
        tags: ['blank', 'red'],
        size: { h: 14, w: 21, uom: 'cm' }
        },
        {
        item: 'mat',
        qty: 85,
        tags: ['gray'],
        size: { h: 27.9, w: 35.5, uom: 'cm' }
        },
        {
        item: 'mousepad',
        qty: 25,
        tags: ['gel', 'blue'],
        size: { h: 19, w: 22.85, uom: 'cm' }
        }
    ]);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main().catch(console.error);