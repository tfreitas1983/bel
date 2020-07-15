import http from "../http-common"

class PacienteDataService {
    buscarTodos(page) {
        return http.get(`/pacientes?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/pacientes/${id}`)
    }

    cadastrar(data) {
        return http.post("/pacientes", data)
    }

    editar(id, data) {
        return http.put(`/pacientes/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/pacientes/${id}`)
    }

    apagarTodos() {
        return http.delete(`/pacientes`)
    }

    buscarNome(nome, page) {
        return http.get(`/pacientes?nome=${nome}&page=${page}`)
    }

    cadastrarImagem(file) {
        return http.post("/pacientes/files", file)
    } 

    buscarImagens() {
        return http.get("/pacientes/files")
    }
}

export default new PacienteDataService()