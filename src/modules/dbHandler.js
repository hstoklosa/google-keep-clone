export default class databaseHandler {
    constructor() {
        this.reference = db.ref('notes/').once('value');
    }

    async getData() {
        const database = await db.ref('notes/').once('value');
        return database.val();
    }

    async updateData(data) {
        return await db.ref('notes/').set(data);
    }
}