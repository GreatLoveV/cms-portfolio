let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getToken = (): string | null => token;

export default { setToken, getToken };
