
<div id="relatorios_categorias"  class="relatorio-padding-bottom" ini="2014-05-01" fim="2014-05-31"  sub="0">
        <div >
        
                <div class="relatorio-totais-box-total">
            <div class="relatorio-totais-box-title">Receitas 
                <span class="pull-right saldo_positivo">Total: R$ 16.087,59</span>
            </div>
            <div class="relatorio-totais-grafico" id="pizza_receitas"></div>
            <div class="relatorio-totais-dados" >
                    <div class='quadro-detalhamento R'><ul class='header'><li class='coluna-categoria'><table><tr class='header'><td class='coluna-nome'>Centro</td><td class='coluna-quantidade'>Qtd</td><td class='coluna-porcentagem'>%</td><td class='coluna-valor'>Valor (R$)</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-0' cod='0'><table><tr><td class='coluna-nome'>Sem centro <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>7</td><td class='coluna-porcentagem'>100,00%</td><td class='coluna-valor saldo_positivo'>16.087,59</td></tr></table></li></ul></div>            </div>
        </div>
                <div class="relatorio-totais-box-total">
            <div class="relatorio-totais-box-title">Despesas 
                <span class="pull-right saldo_negativo">Total: R$ -38.473,19</span>
            </div>
            <div class="relatorio-totais-grafico" id="pizza_despesas"></div>
            <div class="relatorio-totais-dados" >
                    <div class='quadro-detalhamento D'><ul class='header'><li class='coluna-categoria'><table><tr class='header'><td class='coluna-nome'>Centro</td><td class='coluna-quantidade'>Qtd</td><td class='coluna-porcentagem'>%</td><td class='coluna-valor'>Valor (R$)</td></tr></table></li></ul><ul class='closed'><li class='linha-categoria' id='linha-cat-0' cod='0'><table><tr><td class='coluna-nome'>Sem centro <i class='icon-caret-down'></i></td><td class='coluna-quantidade'>50</td><td class='coluna-porcentagem'>100,00%</td><td class='coluna-valor saldo_negativo'>-38.473,19</td></tr></table></li></ul></div>            </div>
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
        MD.Relatorios.Totais.grafico({"type":"pie","data":[{"id":0,"name":"Sem centro","y":-38473.19,"len":50}]},{"type":"pie","data":[{"id":0,"name":"Sem centro","y":16087.59,"len":7}]});
    })
</script>

