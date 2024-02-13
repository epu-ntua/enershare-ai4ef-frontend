import Keycloak from "keycloak-js";

// local configuration
// const my_keycloak = new Keycloak({
//     "realm": "enershare",
//     "url": "http://enershare.epu.ntua.gr:8080/auth", // Adjusted URL
//     "clientId": "leif_service_local"
// })

// NTUA deployment configuration
const my_keycloak = new Keycloak({
    "realm": "enershare",
    "url": "http://enershare.epu.ntua.gr:8080/auth",
    "clientId": "leif_service_ntua"
})


export default my_keycloak