import UserService from '../services/user.service.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        loggedInUser : localLoggedinUser,
        users: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedInUser(state) {
            console.log(state.loggedInUser)
            return state.loggedInUser
        }
    },
    mutations: {
        setUser(state, {user}) {
            state.loggedInUser = user;
        },
        setUsers(state, {users}) {
            state.users = users;
        },
        removeUser(state, {userId}) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login(context, {userCred}) {
            console.log('login at store');
            const user = await UserService.login(userCred);
            context.commit({type: 'setUser', user})
            return user;
        },
        async signup(context, {userCred}) {
            const user = await UserService.signup(userCred)
            context.commit({type: 'setUser', user})
            return user;
            
        },
        async logout(context) {
            await UserService.logout()
            context.commit({type: 'setUsers', users: []})
            context.commit({type: 'setUser', user: null})
        },
        async loadUsers(context) {
            const users = await UserService.getUsers();
            context.commit({type: 'setUsers', users})
        },
        async removeUser(context, {userId}) {
            await UserService.remove(userId);
            context.commit({type: 'removeUser', userId})
        },
        async updateUser(context, {user}) {
            user = await UserService.update(user);
            context.commit({type: 'setUser', user})
        }
    }
}