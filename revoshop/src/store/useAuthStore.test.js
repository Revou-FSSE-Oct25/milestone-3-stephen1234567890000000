import useAuthStore from "@/store/useAuthStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    const { logout } = useAuthStore.getState();
    logout();
  });

  it("should initialize with no user", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("should login user with token", () => {
    const user = { id: 1, name: "John Doe", email: "john@example.com", role: "customer" };
    const token = "test_token_123";
    const { login } = useAuthStore.getState();

    login(user, token);
    const state = useAuthStore.getState();

    expect(state.user).toEqual(user);
    expect(state.token).toEqual(token);
    expect(state.isAuthenticated).toBe(true);
  });

  it("should logout user", () => {
    const user = { id: 1, name: "John Doe", email: "john@example.com" };
    const token = "test_token_123";
    const { login, logout } = useAuthStore.getState();

    login(user, token);
    logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("should set user", () => {
    const user = { id: 1, name: "Jane Doe", email: "jane@example.com" };
    const { setUser } = useAuthStore.getState();

    setUser(user);
    const state = useAuthStore.getState();

    expect(state.user).toEqual(user);
  });

  it("should set token", () => {
    const token = "new_token_456";
    const { setToken } = useAuthStore.getState();

    setToken(token);
    const state = useAuthStore.getState();

    expect(state.token).toEqual(token);
  });
});
