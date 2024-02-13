import Keycloak from "keycloak-js";

// local configuration
// const my_keycloak = new Keycloak({
//     "realm": "enershare",
//     "url": "http://enershare.epu.ntua.gr:8080/auth", // Adjusted URL
//     "clientId": "leif_service_local"
// })

// ICCS deployment configuration
// const my_keycloak = new Keycloak({
//     "realm": "enershare",
//     "url": "https://oblachek.eu:8443/",
//     "clientId": "leif_service_ntua"
// })

const my_keycloak = new Keycloak({
    "realm": "inergy",
    "url": "https://oblachek.eu:8443/",
    "clientId": "uc7_iccs_deployment"
})

export default my_keycloak