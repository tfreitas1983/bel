import http from "../http-common"

class SalaDataService {
    buscarTodos() {
        return http.get("/salas")
    }

    buscar(id) {
        return http.get(`/salas/${id}`)
    }

    cadastrar(data) {
        return http.post("/salas", data)
    }

    editar(id, data) {
        return http.put(`/salas/${id}`, data)
    }

    buscarDescricao(descricao) {
        return http.get(`/salas?descricao=${descricao}`)
    } 
}

export default new SalaDataService()