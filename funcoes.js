funcoes = {
    retornarValorMoeda: function (pValor) {
        const valorFormatado = Intl.NumberFormat('pt-br',
            { style: 'currency', currency: 'BRL' }).format(pValor);
        return valorFormatado ;
    },
}