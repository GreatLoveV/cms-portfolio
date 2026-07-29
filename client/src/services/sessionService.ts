import persistentAuth from "./persistentAuth";
import tokenService from "./tokenService";

const clearSession = () => {
  persistentAuth.removeAuth();
  tokenService.removeToken();
};

export default { clearSession };
