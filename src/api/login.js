import httpRequest from "@/utils/http";

export const loginAPI = ({account, password}) => {
  return httpRequest.post("/login", { account, password });
};

