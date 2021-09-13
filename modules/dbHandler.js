export default class databaseHandler {
    constructor() {
        this.reference = db.ref('notes/').once('value');
    }

    async getData() {
        const database = await db.ref('notes/').once('value');
        return database.val();
    }

    updateData(data) {
        db.ref('notes/').set(data, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Data updated successfully!');
            }
        });
    }

}