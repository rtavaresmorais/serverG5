const objPrincipal = {

    dados: [],

    somatorios: {},
    isMobile: {

        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function () {

            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
    },
    retornarValorMoeda: function (pValor) {
        const valorFormatado = Intl.NumberFormat('pt-br',
            { style: 'currency', currency: 'BRL' }).format(pValor);
        return valorFormatado < 0 ? `<span class="negativo">${valorFormatado}</span>` : valorFormatado;
    },
    filtrarPorCampo: function (array, paresChaveValor) {
        let resultado = array;
        for (const par of paresChaveValor) {
            const [campo, valor] = Object.entries(par)[0];
            resultado = resultado.filter(item => item[campo] === valor);
        }
        return resultado;
    },

    visualisarDados: function (dados, pNomeDivDestino,pTitulo) {

        const mapeamento = {
            "entrada": "Entrada",
            "saida": "Saída",
            "saldo": "Saldo"
        };
        const self = this;
        let html = '';
        
        for (const [propriedade, valores] of Object.entries(dados)) {
           // html += `<h2 style="margin-top: 0">${propriedade}</h2>`;
            html += `<h4 style="margin-top: 0;font-family: PT Sans">${pTitulo}</h4>`;
            html += `<div class="ano" style="font-family: PT Sans">`;
            for (const [chave, valor] of Object.entries(valores)) {
                if (chave !== "meses") {
                    html += `<div class="item" style="font-family: PT Sans"><span class="label" style="display: inline-block; width: 70px">${mapeamento[chave]}:</span><span class="value" style="font-family: PT Sans;display: inline-block; color: ${valor < 0 ? 'red' : 'black'}">${self.retornarValorMoeda(valor)}</span></div>`;
                }
            }
            html += `</div>`;
            for (const [mes, valoresMes] of Object.entries(valores.meses)) {
                html += `<div class="mes" style="margin-left: 40px; font-weight: bold;font-family: PT Sans">${mes}</div>`;
                for (const [chaveMes, valorMes] of Object.entries(valoresMes)) {
                    html += `<div class="item" style="margin-left: 60px"><span class="label" style="font-family: PT Sans;display: inline-block; width: 70px">${mapeamento[chaveMes]}:</span><span class="value" style="font-family: PT Sans;display: inline-block; color: ${valorMes < 0 ? 'red' : 'black'}">${self.retornarValorMoeda(valorMes)}</span></div>`;
                }
            }
        }
       
            html +="<br>";
        // document.getElementById(pNomeDivDestino).innerHTML = html;
        $$(pNomeDivDestino).define("template", html);
        $$(pNomeDivDestino).refresh();
    },
    ObjetoSomatorioGeral: {
        // Array que armazenará os dados das transações

        // Método para calcular os somatórios por ano, origem e mês
        calcularSomatorios: function (dados) {
            console.log(dados);
            let somatorioPorAnoEMes = {}; // Objeto para armazenar os somatórios por ano e mês
            let somatorioPorAnoNomeOrigemMes = {}; // Objeto para armazenar os somatórios por ano, nome de origem e mês
            let somatorioPorAnoNomeCategoriaMes = {}; // Objeto para armazenar os somatórios por ano, nome de categoria e mês

            // Iterar sobre os dados das transações
            dados.forEach(transacao => {
                const ano = transacao.ANO;
                const nomeOrigem = transacao.NOME_ORIGEM;
                const nomeCategoria = transacao.NOME_CATEGORIA;
                const mes = transacao.NOME_MES;
                const valor = transacao.VALOR;
                const tipo = transacao.TIPO;

                // Somatório por ano e mês
                if (!somatorioPorAnoEMes[ano]) {
                    somatorioPorAnoEMes[ano] = {
                        entrada: 0,
                        saida: 0,
                        saldo: 0,
                        meses: {}
                    };
                }

                if (!somatorioPorAnoEMes[ano].meses[mes]) {
                    somatorioPorAnoEMes[ano].meses[mes] = {
                        entrada: 0,
                        saida: 0,
                        saldo: 0
                    };
                }

                // Adicionar o valor ao somatório do tipo (entrada ou saída)
                if (tipo === "Entrada") {
                    somatorioPorAnoEMes[ano].meses[mes].entrada += valor;
                    somatorioPorAnoEMes[ano].entrada += valor;
                } else if (tipo === "Saída") {
                    somatorioPorAnoEMes[ano].meses[mes].saida += valor;
                    somatorioPorAnoEMes[ano].saida += valor;
                }

                // Calcular o saldo do mês
                somatorioPorAnoEMes[ano].meses[mes].saldo = somatorioPorAnoEMes[ano].meses[mes].entrada - somatorioPorAnoEMes[ano].meses[mes].saida;

                // Calcular o saldo do ano
                somatorioPorAnoEMes[ano].saldo = somatorioPorAnoEMes[ano].entrada - somatorioPorAnoEMes[ano].saida;

                // Somatório por ano, nome de origem e mês
                if (!somatorioPorAnoNomeOrigemMes[ano]) {
                    somatorioPorAnoNomeOrigemMes[ano] = {};
                }

                if (!somatorioPorAnoNomeOrigemMes[ano][nomeOrigem]) {
                    somatorioPorAnoNomeOrigemMes[ano][nomeOrigem] = {
                        entrada: 0,
                        saida: 0,
                        saldo: 0,
                        meses: {}
                    };
                }

                if (!somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].meses[mes]) {
                    somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].meses[mes] = {
                        entrada: 0,
                        saida: 0,
                        saldo: 0
                    };
                }

                // Adicionar o valor ao somatório do tipo (entrada ou saída)
                if (tipo === "Entrada") {
                    somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].meses[mes].entrada += valor;
                    somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].entrada += valor;
                } else if (tipo === "Saída") {
                    somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].meses[mes].saida += valor;
                    somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].saida += valor;
                }

                // Calcular o saldo do mês
                somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].meses[mes].saldo = somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].meses[mes].entrada - somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].meses[mes].saida;

                // Calcular o saldo do ano
                somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].saldo = somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].entrada - somatorioPorAnoNomeOrigemMes[ano][nomeOrigem].saida;

                // Somatório por ano, nome de categoria e mês
                if (!somatorioPorAnoNomeCategoriaMes[ano]) {
                    somatorioPorAnoNomeCategoriaMes[ano] = {};
                }

                if (!somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria]) {
                    somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria] = {
                        entrada: 0,
                        saida: 0,
                        saldo: 0,
                        meses: {}
                    };
                }

                if (!somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].meses[mes]) {
                    somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].meses[mes] = {
                        entrada: 0,
                        saida: 0,
                        saldo: 0
                    };
                }

                // Adicionar o valor ao somatório do tipo (entrada ou saída)
                if (tipo === "Entrada") {
                    somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].meses[mes].entrada += valor;
                    somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].entrada += valor;
                } else if (tipo === "Saída") {
                    somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].meses[mes].saida += valor;
                    somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].saida += valor;
                }

                // Calcular o saldo do mês
                somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].meses[mes].saldo = somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].meses[mes].entrada - somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].meses[mes].saida;

                // Calcular o saldo do ano
                somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].saldo = somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].entrada - somatorioPorAnoNomeCategoriaMes[ano][nomeCategoria].saida;
            });

            // Retornar os somatórios
            return { somatorioPorAnoEMes, somatorioPorAnoNomeOrigemMes, somatorioPorAnoNomeCategoriaMes };
        }
    },

    fncCarregar: function (callback) {
        const self = this;
        console.log(self);
        //  fetch("https://script.google.com/macros/s/AKfycby-CqTS75hhRjtDKzBbR6WQRR6hEN8Jw-zTIebaVMqVB4q7kPOoqifnYf25c06Id0U/exec?" +
        //     "action=GET_ENTRADASAIDAS").then(function (response) {
        fetch("https://script.google.com/macros/s/AKfycbxagoTAiRj2Q6blce_FI4adZ6QSIzbrlV9DE7VeBAZmAhTam55bvxOpQVaH8Q_jJ6v9/exec?" +
            "action=GET_MOVIMENTO_ESPELHO").then(function (response) {

                // Verifique se a resposta da API está ok
                // console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na solicitação da API');
                }
            })
            .then(function (data) {
                // Manipule os dados da resposta da API aqui
                // console.log(data);
                // document.getElementById('dTeste').innerHTML = JSON.stringify(data.saida);
                var jsonObj = data.saida;// JSON.parse(data.saida);
                // console.log(jsonObj);
                //  $$("dt").clearAll();
                // $$("dt").parse(data.saida);
                self.dados = jsonObj;
                console.log(self);
                self.somatorios = self.ObjetoSomatorioGeral.calcularSomatorios(self.dados);
                console.log(self.somatorios);
                callback();
            })
            .catch(function (error) {
                // Trate erros de solicitação aqui
                console.error(error);
                return error;

            });
    }
};

