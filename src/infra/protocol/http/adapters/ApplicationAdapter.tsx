import applicationSession from "@/domain/session/ApplicationSession";

const applicationAdapter:IAPIManager = {
    getToken() {
        return applicationSession.accessToken();
    },
    processRefreshToken: () => {
        return new Promise(Boolean);
    },
    redirect() {
        
    },
}

export default applicationAdapter;