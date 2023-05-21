import identity from "@/infra/api/server/Identity"

export default function accessRequired(user: IUserAuth) {
        console.log('Requisitando acesso')
        identity.getToken(user);
        console.log('acesso aplicada')
    

}
