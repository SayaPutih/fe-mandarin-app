export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      localStorage.removeItem("token");
      return null;
    }

    return token;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

export function getUser() {
  const token = getToken();

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload;
  } catch {
    return null;
  }
}

export function isTeacher(){

  if (typeof window === "undefined") {
    return null;
  }

  
  const token = getToken();

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Payload Util")
    console.log(payload)
    const allowedRoles = ["TEACHER", "ADMIN"];
    return allowedRoles.includes(payload.role);
  } catch {
    return null;
  }
}

export function redirectByRole(router: any) {
    const user = getUser();

    if (!user) {
        router.replace("/login");
        return;
    }

    switch (user.role) {

        case "ADMIN":
            router.replace("/admin/dashboard");
            break;

        case "TEACHER":
            router.replace("/teacher/dashboard");
            break;

        default:
            router.replace("/home");
            break;
    }
}