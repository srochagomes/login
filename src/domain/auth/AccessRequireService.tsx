import identity from "@/infra/api/server/Identity"

export default function accessRequired(user?: IUserAuth | undefined) {
        if (user){
          return identity.getTokenUser(user);
        }else{
          return identity.getTokenApp();   
        }

        
        

}
