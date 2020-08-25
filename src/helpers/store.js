export const store = {
  state: {
    adminCollection: [],
    userSession: [],
    isAdmin: false,
  },
  addAdmin(adminFlag) {
    this.state.adminCollection.push(adminFlag);
    this.state.isAdmin = true;
  },

  addSession(username) {
    this.state.userSession.push(username);
  },

  clearSession() {
    this.state.userSession.splice(0, this.state.userSession.length);
    this.state.isAdmin = false;
  },

  clearAdmin() {
    this.state.adminCollection.splice(0, this.state.adminCollection.length);
    this.state.isAdmin = false;
  },
};
