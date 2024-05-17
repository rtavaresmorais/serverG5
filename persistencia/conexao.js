 class Conexao {
    dadosJson={};
   constructor(pDadosJson){
        this.dadosJson = pDadosJson;
   }
    listar =async (pAcesso,  pCallback) => {
        let self = this;
        try {
        const response = await fetch(pAcesso);
        const data = await response.json();
        self.dadosJson = data.saida;
     //   console.log(data);
        pCallback();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
    /* listar = (pAcesso,  pCallback) => {
        let self = this;
        fetch(pAcesso).then(function (response) {
            // Verifique se a resposta da API está ok
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na solicitação da API');
            }
        }).then(function (data) {
            self.dadosJson = data;//.saida
         //  pRetornoJson = jsonObj;
            if (typeof pCallback === 'function') {
                pCallback();
            }
        }).catch(function (error) {
            // Trate erros de solicitação aqui
            console.error(error); 
            return error;
        });*/
    }
    get dadosJson() {
        return this.dadosJson;
    }
}