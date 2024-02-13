import {useEffect} from 'react';
import {useKeycloak} from "@react-keycloak/web";

function Login() {
    const {keycloak, initialized} = useKeycloak();

    useEffect(() => {
        if (initialized) keycloak.login()
    }, [initialized])
}

export default Login;