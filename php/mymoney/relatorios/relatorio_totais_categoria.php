
<div id="relatorios_categorias"  class="relatorio-padding-bottom" ini="2014-05-01" fim="2014-05-31"  sub="0">
        <div style="font-size: 16px;font-weight: bold;text-align: center;padding-bottom: 5px;">
        Visualização por categorias    </div>
    
    <div >
                <div class="relatorio-totais-box-total">
            <div class="relatorio-totais-box-title">Receitas 
                <span class="pull-right saldo_positivo">Total: R$ 16.087,59</span>
            </div>
            <div class="relatorio-totais-grafico" id="pizza_receitas"></div>
            <div class="relatorio-totais-dados" >
                    <div class='quadro-detalhamento R'><ul class='header'><li class='coluna-categoria'><table><tr class='header'><td class='coluna-nome'>Categoria</td><td class='coluna-quantidade'>Qtd</td><td class='coluna-porcentagem'>%</td><td class='coluna-valor'>Valor (R$)</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-905910' cod='905910'><table><tr><td class='coluna-nome'>Financeiras <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>6</td><td class='coluna-porcentagem'>93,05%</td><td class='coluna-valor saldo_positivo'>14.968,88</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-905927' cod='905927'><table><tr><td class='coluna-nome'>Transferência entre contas <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>1</td><td class='coluna-porcentagem'>6,95%</td><td class='coluna-valor saldo_positivo'>1.118,71</td></tr></table></li></ul></div>            </div>
        </div>
                <div class="relatorio-totais-box-total">
            <div class="relatorio-totais-box-title">Despesas 
                <span class="pull-right saldo_negativo">Total: R$ -38.473,19</span>
            </div>
            <div class="relatorio-totais-grafico" id="pizza_despesas"></div>
            <div class="relatorio-totais-dados" >
                    <div class='quadro-detalhamento D'><ul class='header'><li class='coluna-categoria'><table><tr class='header'><td class='coluna-nome'>Categoria</td><td class='coluna-quantidade'>Qtd</td><td class='coluna-porcentagem'>%</td><td class='coluna-valor'>Valor (R$)</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-905892' cod='905892'><table><tr><td class='coluna-nome'>Pessoal <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>15</td><td class='coluna-porcentagem'>76,02%</td><td class='coluna-valor saldo_negativo'>-29.246,85</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-905899' cod='905899'><table><tr><td class='coluna-nome'>Administrativas <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>19</td><td class='coluna-porcentagem'>10,01%</td><td class='coluna-valor saldo_negativo'>-3.852,49</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-905916' cod='905916'><table><tr><td class='coluna-nome'>Impostos <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>6</td><td class='coluna-porcentagem'>5,53%</td><td class='coluna-valor saldo_negativo'>-2.129,40</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-905932' cod='905932'><table><tr><td class='coluna-nome'>Gerais <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>7</td><td class='coluna-porcentagem'>4,52%</td><td class='coluna-valor saldo_negativo'>-1.740,19</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-905928' cod='905928'><table><tr><td class='coluna-nome'>Outras Despesas <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>3</td><td class='coluna-porcentagem'>3,91%</td><td class='coluna-valor saldo_negativo'>-1.504,26</td></tr></table></li></ul></div>            </div>
        </div>
            </div>
    
    <div class="relatorio-totais-resumo">
    <div class="relatorio-totais-box-title">Resumo</div>
    <div class="text-right">
        <table>
        <tr>
            <td class="label_rodape">Receitas</td>
            <td class="dados_rodape saldo_positivo" id="soma_receitas">
                R$ 16.087,59            </td>
        </tr>
        <tr>
            <td class="label_rodape">Despesas</td>
            <td class="dados_rodape saldo_negativo" id="soma_despesas">
                R$ -38.473,19            </td>
        </tr>
        <tr>
            <td class="label_total label_rodape">Total</td>
            <td class="dados_rodape saldo_negativo" id="soma_total">
                R$ -22.385,60            </td>
        </tr>
    </table>
    </div>
</div>
    </div>

<script>
    $(function(){
        MD.Relatorios.Totais.grafico({"type":"pie","data":[{"id":"905892","name":"Pessoal","y":-29246.85,"len":15},{"id":"905899","name":"Administrativas","y":-3852.49,"len":19},{"id":"905916","name":"Impostos","y":-2129.4,"len":6},{"id":"905932","name":"Gerais","y":-1740.19,"len":7},{"id":"905928","name":"Outras Despesas","y":-1504.26,"len":3}]},{"type":"pie","data":[{"id":"905910","name":"Financeiras","y":14968.88,"len":6},{"id":"905927","name":"Transfer\u00eancia entre contas","y":1118.71,"len":1}]});
    })
</script>

