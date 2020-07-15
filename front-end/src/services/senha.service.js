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

    buscarSenha(numero) {
        return http.get(`/senhas?numero=${numero}`)
    } 
}

export default new SenhaDataService()