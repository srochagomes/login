import identityAPI from "@/infra/api/server/IdentityAPI"

export default function accessRequired(user: IUserAuth) {
        console.log('Requisitando acesso')
        identityAPI.getToken(user);
        console.log('acesso aplicada')  

}
