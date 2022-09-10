calcularCustos = (materiais, custos, valorHora, qtdeHora) => {return materiais + custos + (valorHora * qtdeHora)};

calcularLucro = (totalCusto,lucro) => {return totalCusto * lucro / 100};

totalValorPeca = (totalCusto, qtdeLucro) => {return totalCusto + qtdeLucro};

module.exports = async function (context, req) {
    let materiaisUsados = Number(req.query.materiais);
    let custosVariaveis = Number(req.query.custos);
    let horaTrabalhada = Number(req.query.valorHora);
    let quantidadeHora = Number(req.query.qtdeHora);
    let lucroPeca = Number(req.query.lucro);

    if (isNaN(materiaisUsados) || isNaN(custosVariaveis) || isNaN(horaTrabalhada) || isNaN(quantidadeHora) || isNaN(lucroPeca)) {
        return res.status(400).send('Formato de dados incorreto, esses campos aceitam somente numeros.');
    };

    let custoTotal = calcularCustos(materiaisUsados, custosVariaveis, horaTrabalhada, quantidadeHora);
    let resultadoLucro = calcularLucro(custoTotal, lucroPeca);
    let totalPeca = totalValorPeca (custoTotal, resultadoLucro);

    context.res.json({
        materiais: "R$ " + materiaisUsados.toFixed(2), 
        custos: "R$ " + custosVariaveis.toFixed(2), 
        valorHora: "R$ " + horaTrabalhada.toFixed(2),
        qtdeHora: quantidadeHora,
        lucro: "R$ " + lucroPeca.toFixed(2),
        total_Custo: "R$ " + custoTotal.toFixed(2), 
        qtde_Lucro: "R$ " + resultadoLucro.toFixed(2),
        valor_Total: "R$ " + totalPeca.toFixed(2)
    });
}
