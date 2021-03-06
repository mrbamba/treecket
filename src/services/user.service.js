import HttpService from './http.service';

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

function getById(userId) {
    return HttpService.get(`user/${userId}`);
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`);
}

function update(user, password) {
    return HttpService.put(`user/${user._id}`, {user, password});
}

async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred);
    return _handleLogin(user);
}
async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred);
    return _handleLogin(user);
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.removeItem('user');
}
function getUsers(usersFilterBy) {
    // console.log('getting users', usersFilterBy);
    return HttpService.get(`user/?txt=${usersFilterBy.txt}`,usersFilterBy);
}

function _handleLogin(user) {
    // sessionStorage.setItem('user', JSON.stringify(user));
    return user;
}