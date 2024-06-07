import Keycloak from "keycloak-js";

// local configuration
// const my_keycloak = new Keycloak({
//     "realm": "enershare",
//     "url": "https://keycloak.enershare1.epu.ntua.gr",
//     "clientId": "leif_service_local"
// })

// NTUA deployment configuration
const my_keycloak = new Keycloak({
    "realm": "enershare",
    "url": "https://keycloak.enershare1.epu.ntua.gr",
    "clientId": "leif_service_ntua"
})


export default my_keycloak