//import {Conexao} from './persistencia/conexao';


//***************************************************************
class Programa {
    componentes = {};
    filtrarTelaDespesasAgrupadas = {};
    constructor() {
        //metodos-----------------------------------------------------------------

        const filtrarTelaDespesasAgrupadas = (paresChaveValor) => {
            const vDadosSaida = objPrincipal.filtrarPorCampo(objPrincipal.dados, paresChaveValor);
            $$("dt").clearAll();
            $$("dt").parse(vDadosSaida);
            $$("grp").enable();

        }
        const criarTelaPrincipal = () => {
            return {
                id: "pgPrincipal",
                rows: [
                    {
                        height: 40,
                        type: "header",
                        template: "<div style='text-align:center'><span>Tela Principal G5 </span></div>",
                    },
                    {
                        height: 100,
                        template: "<div style=''><span><br><br>Digite a senha para liberar a opção de atualização dos dados </span></div>",
                    }, {
                        rows: [
                            { height: 20 },
                            {
                                view: "text",
                                type: "password",
                                id: 'txtSenha',
                                value: "123",
                                label: "Senha",
                                //	labelAlign: "right",
                                labelWidth: 100,
                                placeholder: "digite a senha e clique em Atualizar dados",
                            },
                            { height: 10 },
                            {
                                height: 40,
                                view: "button",
                                id: 'btnAtualizar',
                                label: 'Atualizar dados', inputWidth: 200,
                                height: 60,
                                click: function (ev, id) {
                                    if ($$("txtSenha").getValue() == 123) {
                                        webix.message("Carregando...");
                                        objPrincipal.fncCarregar(function () {

                                            const vAnoAtual = new Date().getFullYear();
                                            const vDadosDoAno = objPrincipal.filtrarPorCampo(objPrincipal.dados, [{ "ANO": vAnoAtual }]);

                                            const vDadosSaida = objPrincipal.filtrarPorCampo(objPrincipal.dados, [{ "TIPO": "Saída" }]);
                                            console.log(objPrincipal.somatorios.somatorioPorAnoEMes);
                                            objPrincipal.visualisarDados({ "2024": objPrincipal.somatorios.somatorioPorAnoEMes["2024"] }, 'verse_1', "2024");

                                            let c_Dados = objPrincipal.somatorios.somatorioPorAnoNomeOrigemMes["2024"];
                                            let c_Chaves = Object.keys(c_Dados);
                                            let vContador = 0;
                                            // Itera sobre as chaves
                                            for (let i = 0; i < c_Chaves.length; i++) {
                                                const chave = c_Chaves[i]; // Obtém a chave atual
                                                const imovel = c_Dados[chave]; // Obtém o valor correspondente à chave
                                                vContador = i + 2;
                                                const vNomeView = 'verse_' + String(vContador);
                                                const vOjTemplate = objPrincipal.retornarTemplateResumo(vNomeView);
                                                $$("verses").getBody().addView(vOjTemplate);
                                                console.log(chave);
                                                objPrincipal.visualisarDados({ chave: imovel }, vNomeView, chave)
                                                // Seu código para processar cada imóvel...
                                            };
                                            const chavesOrdenadas = Object.keys(objPrincipal.somatorios.somatorioPorAnoNomeCategoriaMes["2024"]).sort();
                                            // Criar um novo objeto com as chaves ordenadas
                                            const dadosOrdenados = {};
                                            chavesOrdenadas.forEach(chave => {
                                                dadosOrdenados[chave] = objPrincipal.somatorios.somatorioPorAnoNomeCategoriaMes["2024"][chave];
                                            });
                                            //	console.log(dadosOrdenados);
                                            c_Dados = dadosOrdenados;
                                            c_Chaves = Object.keys(c_Dados);

                                            // Itera sobre as chaves
                                            for (let i = 0; i < c_Chaves.length; i++) {
                                                const chave = c_Chaves[i]; // Obtém a chave atual
                                                const imovel = c_Dados[chave]; // Obtém o valor correspondente à chave
                                                const vNomeView = 'verseCategoria_' + String(i + 1);
                                                const vOjTemplate = objPrincipal.retornarTemplateResumo(vNomeView);
                                                $$("verseCategorias").getBody().addView(vOjTemplate);
                                                console.log(chave);
                                                objPrincipal.visualisarDados({ chave: imovel }, vNomeView, chave)
                                                // Seu código para processar cada imóvel...

                                            }
                                            console.log(vDadosDoAno);
                                            console.log(vDadosSaida);
                                            // $$("dt").clearAll();
                                            //   $$("dt").parse(vDadosSaida);
                                            filtrarTelaDespesasAgrupadas([{ "TIPO": "Saída" }]);

                                            $$("treeGrade").clearAll();
                                            $$("treeGrade").parse(vDadosSaida);
                                            $$("tree").clearAll();
                                            $$("tree").parse(vDadosDoAno);
                                            $$("grp").enable();
                                        });
                                    } else {
                                        alert('Senha errada')
                                    }
                                }
                            }, {},
                        ],
                        //}
                    },
                ]
            }
        };
        const criarTelaResumo = () => {
            return [
                {
                    view: "accordionitem",
                    header: "Resumo por Origem",
                    id: 'tplTeste',
                    margin: 10,
                    body: {
                        rows: [
                            {
                                margin: 5, cols: [
                                    {
                                        view: "button", value: "Imprimir por origem", width: 180, height: 60,
                                        click: function () {
                                            webix.print($$("verses"));
                                        }
                                    },
                                ]
                            },
                            {
                                view: "scrollview",
                                borderless: true,
                                id: "verses",
                                scroll: "xy",
                                body: {
                                    width: 400,
                                    rows: [
                                        { id: "", template: "<strong>Resumo dos gastos de 2024, por origem de gastos</strong>", autoheight: true },
                                        { id: "verse_1", template: "html->dadosContainer1", autoheight: true },
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    view: "accordionitem",
                    header: "Resumo por Categoria",
                    collapsed: true,
                    margin: 10,
                    body: {
                        rows: [
                            {
                                margin: 5, cols: [
                                    {
                                        view: "button", value: "Imprimir por categoria", width: 180, height: 60,
                                        click: function () {
                                            webix.print($$("verseCategorias"));
                                        }
                                    },
                                ]
                            },
                            {
                                view: "scrollview",
                                borderless: true,
                                id: "verseCategorias",
                                scroll: "xy",
                                body: {
                                    width: 400,
                                    rows: [
                                        { id: "", template: "<strong>Resumo dos gastos de 2024, por Categoria</strong>", autoheight: true },
                                    ]
                                }
                            }
                        ]
                    }
                }]
        }
        const criarTelaDespesasAgrupadas = () => {
            return [
                {
                    view: "template",
                    template: "<div style='text-align:center'><span>Despesas Agrupadas</span></div>",
                    height: 40, type: "header"
                },
                {
                    header: "Lista de Despesas",
                    //body:	{
                    rows: [
                        {
                            cols: [
                                {
                                    view: "button", type: "form", id: 'grp', label: 'Agrupar', disabled: true, height: 60,
                                    click: function (id, event) {
                                        // gby();
                                        (function () {
                                            $$("dt").data.ungroup();
                                            $$("dt").data.group({
                                                by: function (obj) {
                                                    return obj.NOME_CATEGORIA + "-" + obj.NOME_ORIGEM + obj.NOME_MES + "-" + obj.ANO
                                                },
                                                map: {
                                                    ANO: ["ANO"], NOME_MES: ["NOME_MES"], NOME_ORIGEM: ["NOME_ORIGEM"], OBSERVACAO: ["NOME_CATEGORIA"], VALOR: ["VALOR", "sum"]
                                                    // ANO: ["ANO"], NOME_MES: ["NOME_MES"], NOME_ORIGEM: ["NOME_ORIGEM"], OBSERVACAO: ["NOME_CATEGORIA"],VALOR: ["VALOR", "sum"]
                                                    //ANO: ["ANO"], NOME_MES: ["NOME_MES"], NOME_ORIGEM: ["NOME_ORIGEM"], NOME_CATEGORIA: ["NOME_CATEGORIA"],VALOR: ["VALOR", "sum"]
                                                }
                                            });
                                            $$("dt").data.group({
                                                by: function (obj) {
                                                    return obj.NOME_ORIGEM + "-" + obj.NOME_MES + "-" + obj.ANO
                                                },
                                                map: {
                                                    ANO: ["ANO"], NOME_MES: ["NOME_MES"], OBSERVACAO: ["NOME_ORIGEM"], NOME_CATEGORIA: ["NOME_CATEGORIA"], VALOR: ["VALOR", "sum"]
                                                }
                                            });
                                            $$("dt").data.group({
                                                by: function (obj) {
                                                    return obj.NOME_MES + "-" + obj.ANO
                                                },
                                                map: {
                                                    ANO: ["ANO"], OBSERVACAO: ["NOME_MES"], NOME_CATEGORIA: ["NOME_CATEGORIA"], VALOR: ["VALOR", "sum"]
                                                }
                                            });
                                            $$("dt").data.group({
                                                by: "ANO",
                                                map: {
                                                    OBSERVACAO: ["ANO"], NOME_CATEGORIA: ["NOME_CATEGORIA"], NOME_ORIGEM: ["NOME_ORIGEM"], VALOR: ["VALOR", "sum"]
                                                }
                                            });
                                        })();
                                        /*
                                        (function () {
                                            $$("dt").data.ungroup();
                                            $$("dt").data.group({
                                                by: function (obj) {
                                                    return obj.NOME_ORIGEM + "-" + obj.NOME_MES + "-" + obj.ANO
                                                },
                                                map: {
                                                    ANO: ["ANO"], NOME_MES: ["NOME_MES"], NOME_CATEGORIA: ["NOME_ORIGEM"], VALOR: ["VALOR", "sum"]
                                                }
                                            });
                                            $$("dt").data.group({
                                                by: function (obj) {
                                                    return obj.NOME_MES + "-" + obj.ANO
                                                },
                                                map: {
                                                    ANO: ["ANO"], NOME_CATEGORIA: ["NOME_MES"], VALOR: ["VALOR", "sum"]
                                                }
                                            });
                                            $$("dt").data.group({
                                                by: "ANO",
                                                map: {
                                                    NOME_CATEGORIA: ["ANO"], NOME_ORIGEM: ["NOME_ORIGEM"], VALOR: ["VALOR", "sum"]
                                                }
                                            });
                                        })();
                                        */
                                        $$("grp").disable();
                                    }
                                },
                                {
                                    view: "button", type: "form", id: '', label: 'Expandir', height: 60,
                                    click: () => {
                                        $$("dt").openAll();
                                    }
                                },
                                {
                                    view: "button", type: "form", id: '', label: 'Contrair', height: 60,
                                    click: () => {
                                        $$("dt").closeAll();
                                    }
                                },
                                {
                                    view: "button", label: "imprimir", type: "form", id: "btnImp", height: 60,
                                    click: function () {
                                        $$("btnImp").disable();
                                        if (objPrincipal.isMobile.any()) {
                                            setTimeout(() => {
                                                alert("Impressão indisponivel para dispositivo móvel(celular)!");
                                                $$("btnImp").enable();
                                            },
                                                10);
                                            return;
                                        }
                                        $$("btnImp").enable();
                                        webix.print($$("dt"));
                                    }
                                }
                            ]
                        },
                        {
                            view: "radio", labelWidth: 55, id: "cbPesquisaTipo", value: 2, vertical: false, label: "Filtro:",
                            options: [{ id: 1, value: "Entrada" }, { id: 2, value: "Saída" }],
                            on: {
                                onChange: function (newValue, oldValue, config) {
                                    if (newValue == 1) {
                                        filtrarTelaDespesasAgrupadas([{ "TIPO": "Entrada" }]);
                                    } else {
                                        filtrarTelaDespesasAgrupadas([{ "TIPO": "Saída" }]);
                                    }
                                }
                            }
                        },
                        {
                            view: "treetable",
                            autoConfig: false,
                            css: { "font-family": "PT Sans", "font-size": "14px" },
                            id: "dt",
                            type: {
                                folder: function (obj) {
                                    return ""
                                }
                            },
                            columns: [{
                                id: "desc",
                                header: "Ano/Mês/Origem/Descrição",
                                width: 310,
                                template: function (obj, common) {
                                    return common.treetable(obj, common) + (obj.OBSERVACAO);
                                    // return common.treetable(obj, common) + (obj.NOME_CATEGORIA);
                                }
                            },
                            /*  {
                                  id: "OBSERVACAO",
                                  sort: "string",
                                  header: "Descrição do Gasto",
                                  width: 280,
                              },*/
                            {
                                id: "VALOR",
                                header: "Valor Despesa",
                                width: 110,
                                template: function (obj) {
                                    const cValor = objPrincipal.retornarValorMoeda(obj.VALOR);
                                    if (obj.$group)
                                        return "<strong>" + cValor + "</strong>";

                                    return cValor;
                                }
                            },
                            {
                                id: "DATA",
                                //sort: "string",
                                header: "Data",
                                width: 70,
                                template: function (obj) {
                                    return formatoData(obj.DATA);
                                }
                            },
                            ],
                            //autowidth: true,
                            prerender: true,
                            scroll: true, scrollX: false,
                            select: true
                        }
                    ]
                    //}
                }
            ]
        }
        const criarTelaLancamentos = () => {
            return [
                {
                    height: 40,
                    type: "header",
                    template: "<div style='text-align:center'><span>Lista geral de gastos</span></div>"
                },
                {
                    cols: [
                        {
                            view: "radio", labelWidth: 90, id: "cbItensPesquisa", value: 1, vertical: true, label: "Filtro",
                            options: [{ id: 1, value: "Origem do gasto" }, { id: 2, value: "Categoria" }]
                        },
                        {
                            view: "button", value: "Imprimir ", type: "form", width: 100, height: 60,
                            click: function () {
                                webix.print($$("tree"));
                            }
                        },
                    ]
                },
                {
                    view: "text", height: 40, id: "unitlist_input", label: "", css: "fltr", labelWidth: 5,
                    placeholder: "digite aqui para pesquisar",

                },
                {
                    view: "unitlist",
                    id: "tree",
                    filterMode: {
                        level: 0,
                        showSubItems: 1
                    },
                    uniteBy: function (obj) {
                        return obj.NOME_MES;
                    },
                    template: function (obj) {
                        let vTipo = "<span >"
                        const valorFormatado = Intl.NumberFormat('pt-br',
                            { style: 'currency', currency: 'BRL' }).format(obj.VALOR)

                        if (obj.TIPO != 'Entrada')
                            vTipo = "<span class='lista-text-tipo'>";

                        return "<div class='lista-container'>" +
                            "  <div class='lista-left-column'>" +
                            "    <span class='lista-text-top' >" + obj.NOME_ORIGEM + "</span>" +
                            "    <span > ( " + obj.NOME_CATEGORIA + " )</span><br>" +
                            "    <div class='lista-text-justificado'> <span >" + obj.OBSERVACAO + "</span></div>" +
                            "  </div>" +
                            "  <div class='lista-right-column'>" +
                            "     <span >" + formatoData(obj.DATA) + "</span><br>" +
                            "     <span >" + valorFormatado + "</span><br>" +
                            vTipo + obj.TIPO + "</span>" +
                            "  </div>" +
                            "</div>"
                    },
                    type: {
                        height: 90
                    },
                    select: true,

                }
            ]
        }
        //---------------------------------------------------------------------------
        this.componentes = {
            telaPrincipal: criarTelaPrincipal(),
            telaResumo: criarTelaResumo(),
            telaDespesasAgrupadas: criarTelaDespesasAgrupadas(),
            telaLancamentos: criarTelaLancamentos(),
        };
    }
    //gets e sets--------------------------------------------------------
    get componentes() {
        return this.componentes;
    }
    get filtrarTelaDespesasAgrupadas() {
        return this.filtrarTelaDespesasAgrupadas;
    }
    //---------------------------------------------------------------------
}