import http from "../http-common"

class ClinicaDataService {
    buscarTodos() {
        return http.get("/clinica")
    }
    buscar(id) {
        return http.get(`/clinica/${id}`)
    }
    cadastrar(data) {
        return http.post("/clinica", data)
    }
    editar(id, data) {
        return http.put(`/clinica/${id}`, data)
    }
}

export default new ClinicaDataService()