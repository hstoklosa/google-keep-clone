export default class databaseHandler {
    constructor() {
        this.reference = db.ref('notes/').once('value');
    }

    async getData() {
        const database = await db.ref('notes/').once('value');
        return database.val();
    }

    setData(id, title, content) {
        db.ref('notes/' + id).set({
            title: title,
            content: content
        }, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Data saved succesfully!');
            }
        });
    }

    updateData(data) {
        db.ref('notes/').set(data);
    }

}