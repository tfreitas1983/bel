import http from "../http-common"

class GuicheDataService {
    buscarTodos() {
        return http.get("/guiches")
    }

    buscar(id) {
        return http.get(`/guiches/${id}`)
    }

    cadastrar(data) {
        return http.post("/guiches", data)
    }

    editar(id, data) {
        return http.put(`/guiches/${id}`, data)
    }

    buscarDescricao(descricao) {
        return http.get(`/guiches?descricao=${descricao}`)
    } 
}

export default new GuicheDataService()