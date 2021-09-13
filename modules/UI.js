export default class UserInterface {
    constructor() {
        this.ui = null;
    }

    createNote(title, content) {
        return (
            `<div class="note">
                <h2>${title}</h2>
                <p>${content}</p>
            </div>`
        );
    }
}