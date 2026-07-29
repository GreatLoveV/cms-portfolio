let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const removeToken = () => {
  token = null;
};

const getToken = (): string | null => token;

export default { setToken, removeToken, getToken };
