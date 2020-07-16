import http from "../http-common"

class PainelDataService {
    buscarTodos() {
        return http.get("/painel")
    }

    buscar(id) {
        return http.get(`/painel/${id}`)
    }

    cadastrar(data) {
        return http.post("/painel", data)
    }

    editar(id, data) {
        return http.put(`/painel/${id}`, data)
    }

    buscarDescricao(descricao) {
        return http.get(`/painel?descricao=${descricao}`)
    } 
}

export default new PainelDataService()