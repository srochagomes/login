const loginSocialRedirect = {    
    getUrl():string {
        return window.location.protocol+'//'+window.location.host+'/?socialLogin=true'
    }    
}

export default loginSocialRedirect;