<div id="faturas-fechadas" style="display:none;">[]</div>
<div class="btn-toolbar agenda-header md-header nfechamento ">
    <div style="margin: 0;" class="btn-toolbar" id="header-cc" vencida="1" inativa="0">
        <div class="btn-group">
            <select id="select_cartoes" style="margin: 0;">
                                <option value="35641"
                        selected venc='2014-05-01'>
                    Braulio                </option>
                            </select>
        </div>

        <div class="header-calendar">{"min":"2014-05-01","ini":"2014-05-01","unico":1}</div>

        <div class="btn-group pull-right">
            <button class="btn btn-small aberta" id="botao_pagamento_cc" >
                <i class="icon-ok-sign"></i>
                <span>Pagamento</span>
            </button>
            <button style="display: none;" class="btn btn-small" id="botao_abrir_cc">Reabrir Fatura</button>
            <button class="btn btn-small aberta" id="botao_fechar_cc">
                <i class="icon-file-alt"></i>
                <span>Fechar Fatura</span>
            </button>
            <button  class="btn btn-small" id="print-fatura" >
                <i class="icon-print"></i>
                <span>Imprimir</span>
            </button>
        </div>
    </div>
    <div style="margin: 10px 0 0 0;" class="btn-toolbar">
        <div class="btn-group ">
                    
            <button class="btn btn-small dropdown-toggle aberta" data-toggle="dropdown">
                <i class="icon-plus-sign"></i>
                Novo lançamento
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu novo-lancamento-dropdown">
                <li>
                    <a href="javascript:void(0);" class="btn-novo-lancamento despesa" >
                        <i class="icon-circle-arrow-down icon-fixed-width"></i>
                        Despesa
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" class="btn-novo-lancamento receita">
                        <i class="icon-circle-arrow-up icon-fixed-width"></i>
                        Receita
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);"  class="btn-novo-lancamento transferencia" >
                        <i class="icon-exchange icon-fixed-width"></i>
                        Transferência
                    </a>
                </li>
                <li class="divider"></li>
                <li>
                    <a href="javascript:void(0);" id="novo-lancamento-grupo" >
                        <i class="icon-sitemap icon-fixed-width"></i>
                        Grupo de lançamentos
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" id="btn-importar-lancamentos" >
                        <i class="icon-upload-alt icon-fixed-width"></i>
                        Importar Arquivo
                    </a>
                </li>
            </ul>
                            </div>
        <div class="btn-group pull-right">
            <button class="btn btn-small filter-trigger">
                <i class="icon-filter"></i>
                <span class="filter-counter">Filtros</span>
                <i></i>
            </button>
        </div>
        <div class="filter-manager">
    
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                <div class="btn-group filter-button" filter-type="repeticao">
                    <button class="btn btn-small filter-label">Repetição</button>
                    <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu filter-list">
                        <li class="filter-inverse" >
            <label class="checkbox qtitle" title="Seleciona todas as opções de filtros exceto as escolhidas" ><input type="checkbox">Filtro inverso</label>
        </li>
        <li class="divider"></li><li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                        <li>
                            <a href="javascript:void(0);" filter-value="unico">Únicos</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="parcelado">Parcelados</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="fixo">Fixos</a>
                        </li>
                    </ul>
                </div> 
                
                <div class="btn-group filter-button" filter-type="conciliado">
                    <button class="btn btn-small filter-label">Status</button>
                    <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu filter-list">

                        <li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                        <li>
                            <a href="javascript:void(0);" filter-value="Nconciliado">Não conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado">Conciliado</a>
                        </li>

                    </ul>

                </div>

                
                <div class="btn-group filter-button" filter-type="categoria">
                    <button class="btn btn-small filter-label">Categorias</button>
                    <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu filter-list">
                        <li class="filter-inverse" >
            <label class="checkbox qtitle" title="Seleciona todas as opções de filtros exceto as escolhidas" ><input type="checkbox">Filtro inverso</label>
        </li>
        <li class="divider"></li><li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899' class='saldo_negativo'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590' class='saldo_negativo'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901' class='saldo_negativo'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589' class='saldo_negativo'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902' class='saldo_negativo'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908' class='saldo_negativo'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393' class='saldo_negativo'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909' class='saldo_negativo'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904' class='saldo_negativo'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396' class='saldo_negativo'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406' class='saldo_negativo'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903' class='saldo_negativo'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397' class='saldo_negativo'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398' class='saldo_negativo'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900' class='saldo_negativo'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399' class='saldo_negativo'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026' class='saldo_negativo'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404' class='saldo_negativo'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405' class='saldo_negativo'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407' class='saldo_negativo'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408' class='saldo_negativo'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905' class='saldo_negativo'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907' class='saldo_negativo'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236' class='saldo_negativo'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591' class='saldo_negativo'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906' class='saldo_negativo'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924' class='saldo_negativo'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926' class='saldo_negativo'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925' class='saldo_negativo'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409' class='saldo_negativo'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932' class='saldo_negativo'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939' class='saldo_negativo'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935' class='saldo_negativo'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592' class='saldo_negativo'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593' class='saldo_negativo'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936' class='saldo_negativo'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391' class='saldo_negativo'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934' class='saldo_negativo'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395' class='saldo_negativo'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594' class='saldo_negativo'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937' class='saldo_negativo'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410' class='saldo_negativo'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916' class='saldo_negativo'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919' class='saldo_negativo'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920' class='saldo_negativo'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923' class='saldo_negativo'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922' class='saldo_negativo'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921' class='saldo_negativo'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917' class='saldo_negativo'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392' class='saldo_negativo'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918' class='saldo_negativo'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928' class='saldo_negativo'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892' class='saldo_negativo'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893' class='saldo_negativo'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896' class='saldo_negativo'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894' class='saldo_negativo'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898' class='saldo_negativo'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400' class='saldo_negativo'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402' class='saldo_negativo'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403' class='saldo_negativo'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895' class='saldo_negativo'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897' class='saldo_negativo'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910' class='saldo_positivo'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912' class='saldo_positivo'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914' class='saldo_positivo'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915' class='saldo_positivo'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911' class='saldo_positivo'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913' class='saldo_positivo'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002' class='saldo_positivo'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929' class='saldo_positivo'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927' class='saldo_positivo'>Transferência entre contas</a></li>                    </ul>
                </div>
                            </td>
            <td>
                <div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div>        
            </td>
        </tr>
    </table>  
    
    <div class="active-filters"></div>
</div>
<span style="display: none" id="limites">[]</span>
<span style="display: none" id="tiposacc">[]</span>    </div>
</div>
<div id="lancamentos-fatura"></div>

<script>    
    $(function(){
                
    });
</script>

