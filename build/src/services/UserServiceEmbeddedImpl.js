export class UserServiceEmbeddedImpl {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        if (this.users.findIndex(u => u.id === user.id) === -1) {
            this.users.push(user);
            return true;
        }
        return false;
    }
    getAllUsers() {
        return [...this.users];
    }
    getUserIndex(userId) {
        return this.users.findIndex(elem => elem.id === userId);
    }
    getUser(userId) {
        const index = this.getUserIndex(userId);
        return index === -1 ? null : this.users[index];
    }
    removeUser(userId) {
        const index = this.getUserIndex(userId);
        if (index === -1)
            return null;
        const removedUser = this.users.splice(index, 1);
        return removedUser[0];
    }
    updateUser(newUserData) {
        const index = this.getUserIndex(newUserData.id);
        if (index === -1)
            return false;
        this.users[index] = newUserData;
        return true;
    }
}
