import http from "../http-common"

class SenhaDataService {
    buscarTodos() {
        return http.get("/senhas")
    }

    buscar(id) {
        return http.get(`/senhas/${id}`)
    }

    cadastrar(data) {
        return http.post("/senhas", data)
    }

    editar(id, data) {
        return http.put(`/senhas/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/senhas/${id}`)
    }

    buscarSenha(paciente, page) {
        return http.get(`/senhas?paciente=${paciente}&page=${page}`)
    } 

    apagarTodos() {
        return http.delete(`/senhas`)
    }
}

export default new SenhaDataService()