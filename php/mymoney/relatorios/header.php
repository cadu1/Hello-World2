<?php 
    $header = json_decode($_POST["p2"]);
//    echo $_POST["p2"] ."<br/>";
//    echo $header->tipo;
    if($header->tipo == "CONTAS_PAGAR_RECEBER"):
?>
<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Contas a pagar e receber</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                                <div class="btn-group filter-button" filter-type="forma">
                    <button class="btn btn-small filter-label">F. Pagto</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem forma de pagto.</a></li>
                        <li><a href='javascript:void(0)' filter-value='296241'>Boleto</a></li><li><a href='javascript:void(0)' filter-value='296242'>Cartão de Crédito</a></li><li><a href='javascript:void(0)' filter-value='296243'>Cartão de Débito</a></li><li><a href='javascript:void(0)' filter-value='296244'>Cheque</a></li><li><a href='javascript:void(0)' filter-value='296247'>DOC/TED</a></li><li><a href='javascript:void(0)' filter-value='296245'>Depósito</a></li><li><a href='javascript:void(0)' filter-value='296246'>Dinheiro</a></li><li><a href='javascript:void(0)' filter-value='296248'>Débito Automático</a></li><li><a href='javascript:void(0)' filter-value='296249'>Internet</a></li><li><a href='javascript:void(0)' filter-value='296250'>Outros</a></li>                    </ul>
                </div>    
                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "EVOLUCAO_CAT"): ?>
<div id="relatorio-header" ini="2014-01-01" fim="2014-12-31">
    <span class="relatorio-nome">Evolução por categoria</span>
    
            <select id="select-anos-relatorios" class="select-year">
            <option value='2010-01-01' >2010</option><option value='2011-01-01' >2011</option><option value='2012-01-01' >2012</option><option value='2013-01-01' >2013</option><option value='2014-01-01' selected>2014</option><option value='2015-01-01' >2015</option><option value='2016-01-01' >2016</option><option value='2017-01-01' >2017</option><option value='2018-01-01' >2018</option>        </select>
            
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
                <span class="btn btn-small" >
            <label style="margin: 0;font-size: 12px;">
                <input id="visualizar-subcat" type="checkbox"  style="margin:0;">
                Visualizar subcategorias
            </label>
        </span>
            </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    </div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "EVOLUCAO_RD"): ?>

<div id="relatorio-header" ini="2014-02-15" fim="2014-04-15">
    <span class="relatorio-nome">Evolução receitas e despesas</span>
    
            <div class="btn-group">
            <button class="btn btn-small" id="periodbg">
                <i class="icon-double-angle-left"></i>
            </button>
            <button class="btn btn-small" id='periodb'>
                <i class="icon-angle-left"></i>
            </button>
            <button class="btn btn-small" id="periodf">
                <i class="icon-angle-right"></i>
            </button>
            <button class="btn btn-small" id="periodfg">
                <i class="icon-double-angle-right"></i>
            </button>
        </div>
        <div class="btn-group">
            <button class="btn btn-small" id="perioda">
                <span>Último trimestre</span>
            </button>
        </div>
            
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
                <span class="btn btn-small" >
            <label style="margin: 0;font-size: 12px;">
                <input id="visualizar-subcat" type="checkbox"  style="margin:0;">
                Visualizar subcategorias
            </label>
        </span>
            </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    </div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "EXTRATO_DETALHADO"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Extrato Detalhado</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <span class="btn btn-small qtitle"  title="Projetar saldo futuro com o resíduo das metas" qtitle-data-at="bottom center" qtitle-data-my="top center">
            <label style="margin: 0;font-size: 12px;" >
                <input id="considerar-residuo-metas" type="checkbox"  style="margin:0;">
                 Resíduo das metas
            </label>
        </span><button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                <div class="btn-group filter-button" filter-type="tipo">
                    <button class="btn btn-small filter-label">Tipo</button>
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
                            <a href="javascript:void(0);" filter-value="despesa">Despesas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="receita">Receitas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="transferencia">Transferências</a>
                        </li>
                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                                <div class="btn-group filter-button" filter-type="forma">
                    <button class="btn btn-small filter-label">F. Pagto</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem forma de pagto.</a></li>
                        <li><a href='javascript:void(0)' filter-value='296241'>Boleto</a></li><li><a href='javascript:void(0)' filter-value='296242'>Cartão de Crédito</a></li><li><a href='javascript:void(0)' filter-value='296243'>Cartão de Débito</a></li><li><a href='javascript:void(0)' filter-value='296244'>Cheque</a></li><li><a href='javascript:void(0)' filter-value='296247'>DOC/TED</a></li><li><a href='javascript:void(0)' filter-value='296245'>Depósito</a></li><li><a href='javascript:void(0)' filter-value='296246'>Dinheiro</a></li><li><a href='javascript:void(0)' filter-value='296248'>Débito Automático</a></li><li><a href='javascript:void(0)' filter-value='296249'>Internet</a></li><li><a href='javascript:void(0)' filter-value='296250'>Outros</a></li>                    </ul>
                </div>    
                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "FLUXO_CAIXA"): ?>

<div id="relatorio-header" ini="2014-05-15" fim="2014-06-15">
    <span class="relatorio-nome">Fluxo de Caixa Diário</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="15/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="15/06/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                        <button class="btn btn-small DAY" id="alternar-periodo-diario-mensal">
                Período mensal            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <span class="btn btn-small qtitle"  title="Projetar saldo futuro com o resíduo das metas" qtitle-data-at="bottom center" qtitle-data-my="top center">
            <label style="margin: 0;font-size: 12px;" >
                <input id="considerar-residuo-metas" type="checkbox"  style="margin:0;">
                 Resíduo das metas
            </label>
        </span><button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "LANCAMENTOS_CATEGORIA"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Lançamentos por Categoria</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                <div class="btn-group filter-button" filter-type="tipo">
                    <button class="btn btn-small filter-label">Tipo</button>
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
                            <a href="javascript:void(0);" filter-value="despesa">Despesas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="receita">Receitas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="transferencia">Transferências</a>
                        </li>
                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
                        </li>
                                                <li class="divider"></li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Aberta"><span class='badge badge-status Aberta'>&nbsp;</span>Fatura aberta</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Fechada"><span class='badge badge-status Fechada'>&nbsp;</span>Fatura fechada</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                                <div class="btn-group filter-button" filter-type="forma">
                    <button class="btn btn-small filter-label">F. Pagto</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem forma de pagto.</a></li>
                        <li><a href='javascript:void(0)' filter-value='296241'>Boleto</a></li><li><a href='javascript:void(0)' filter-value='296242'>Cartão de Crédito</a></li><li><a href='javascript:void(0)' filter-value='296243'>Cartão de Débito</a></li><li><a href='javascript:void(0)' filter-value='296244'>Cheque</a></li><li><a href='javascript:void(0)' filter-value='296247'>DOC/TED</a></li><li><a href='javascript:void(0)' filter-value='296245'>Depósito</a></li><li><a href='javascript:void(0)' filter-value='296246'>Dinheiro</a></li><li><a href='javascript:void(0)' filter-value='296248'>Débito Automático</a></li><li><a href='javascript:void(0)' filter-value='296249'>Internet</a></li><li><a href='javascript:void(0)' filter-value='296250'>Outros</a></li>                    </ul>
                </div>    
                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "LANCAMENTOS_CENTRO"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Lançamentos por Centro</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                <div class="btn-group filter-button" filter-type="tipo">
                    <button class="btn btn-small filter-label">Tipo</button>
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
                            <a href="javascript:void(0);" filter-value="despesa">Despesas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="receita">Receitas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="transferencia">Transferências</a>
                        </li>
                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
                        </li>
                                                <li class="divider"></li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Aberta"><span class='badge badge-status Aberta'>&nbsp;</span>Fatura aberta</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Fechada"><span class='badge badge-status Fechada'>&nbsp;</span>Fatura fechada</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                                <div class="btn-group filter-button" filter-type="forma">
                    <button class="btn btn-small filter-label">F. Pagto</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem forma de pagto.</a></li>
                        <li><a href='javascript:void(0)' filter-value='296241'>Boleto</a></li><li><a href='javascript:void(0)' filter-value='296242'>Cartão de Crédito</a></li><li><a href='javascript:void(0)' filter-value='296243'>Cartão de Débito</a></li><li><a href='javascript:void(0)' filter-value='296244'>Cheque</a></li><li><a href='javascript:void(0)' filter-value='296247'>DOC/TED</a></li><li><a href='javascript:void(0)' filter-value='296245'>Depósito</a></li><li><a href='javascript:void(0)' filter-value='296246'>Dinheiro</a></li><li><a href='javascript:void(0)' filter-value='296248'>Débito Automático</a></li><li><a href='javascript:void(0)' filter-value='296249'>Internet</a></li><li><a href='javascript:void(0)' filter-value='296250'>Outros</a></li>                    </ul>
                </div>    
                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "LANCAMENTOS_CONTATO"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Lançamentos por Contato</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                <div class="btn-group filter-button" filter-type="tipo">
                    <button class="btn btn-small filter-label">Tipo</button>
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
                            <a href="javascript:void(0);" filter-value="despesa">Despesas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="receita">Receitas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="transferencia">Transferências</a>
                        </li>
                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
                        </li>
                                                <li class="divider"></li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Aberta"><span class='badge badge-status Aberta'>&nbsp;</span>Fatura aberta</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Fechada"><span class='badge badge-status Fechada'>&nbsp;</span>Fatura fechada</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                                <div class="btn-group filter-button" filter-type="forma">
                    <button class="btn btn-small filter-label">F. Pagto</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem forma de pagto.</a></li>
                        <li><a href='javascript:void(0)' filter-value='296241'>Boleto</a></li><li><a href='javascript:void(0)' filter-value='296242'>Cartão de Crédito</a></li><li><a href='javascript:void(0)' filter-value='296243'>Cartão de Débito</a></li><li><a href='javascript:void(0)' filter-value='296244'>Cheque</a></li><li><a href='javascript:void(0)' filter-value='296247'>DOC/TED</a></li><li><a href='javascript:void(0)' filter-value='296245'>Depósito</a></li><li><a href='javascript:void(0)' filter-value='296246'>Dinheiro</a></li><li><a href='javascript:void(0)' filter-value='296248'>Débito Automático</a></li><li><a href='javascript:void(0)' filter-value='296249'>Internet</a></li><li><a href='javascript:void(0)' filter-value='296250'>Outros</a></li>                    </ul>
                </div>    
                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "LANCAMENTOS_PROJETO"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Lançamentos por Projeto</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                <div class="btn-group filter-button" filter-type="tipo">
                    <button class="btn btn-small filter-label">Tipo</button>
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
                            <a href="javascript:void(0);" filter-value="despesa">Despesas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="receita">Receitas</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="transferencia">Transferências</a>
                        </li>
                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
                        </li>
                                                <li class="divider"></li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Aberta"><span class='badge badge-status Aberta'>&nbsp;</span>Fatura aberta</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Fechada"><span class='badge badge-status Fechada'>&nbsp;</span>Fatura fechada</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                                <div class="btn-group filter-button" filter-type="forma">
                    <button class="btn btn-small filter-label">F. Pagto</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem forma de pagto.</a></li>
                        <li><a href='javascript:void(0)' filter-value='296241'>Boleto</a></li><li><a href='javascript:void(0)' filter-value='296242'>Cartão de Crédito</a></li><li><a href='javascript:void(0)' filter-value='296243'>Cartão de Débito</a></li><li><a href='javascript:void(0)' filter-value='296244'>Cheque</a></li><li><a href='javascript:void(0)' filter-value='296247'>DOC/TED</a></li><li><a href='javascript:void(0)' filter-value='296245'>Depósito</a></li><li><a href='javascript:void(0)' filter-value='296246'>Dinheiro</a></li><li><a href='javascript:void(0)' filter-value='296248'>Débito Automático</a></li><li><a href='javascript:void(0)' filter-value='296249'>Internet</a></li><li><a href='javascript:void(0)' filter-value='296250'>Outros</a></li>                    </ul>
                </div>    
                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "TOTAIS_CATEGORIA"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Totais por Categoria</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
                <span class="btn btn-small" >
            <label style="margin: 0;font-size: 12px;">
                <input id="visualizar-subcat" type="checkbox"  style="margin:0;">
                Visualizar subcategorias
            </label>
        </span>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
                        </li>
                                            </ul>
                </div>   

                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "TOTAIS_CENTRO"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Totais por Centro de Custo/Lucro</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "TOTAIS_CONTATO"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Totais por Contato</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php elseif($header->tipo == "TOTAIS_PROJETO"): ?>

<div id="relatorio-header" ini="2014-05-01" fim="2014-05-31">
    <span class="relatorio-nome">Totais por Projeto</span>
    
            <span><input type="text" class="relatorio-data relatorio-data-ini input-date"  value="01/05/2014"/></span> até
        <span><input type="text" class="relatorio-data relatorio-data-fim input-date"  value="31/05/2014"/></span>
                <div class="btn-group">
            <button class="btn btn-small disabled" id="relatorio-buscar">
                <i class="icon-search"></i>
                <span>Buscar</span>
            </button>
                    </div>
        
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="relatorio-print">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
        
        <select id="select_regime" style='width:165px;margin-right: 5px;' class="pull-right">
        <option value='CA' selected>Regime Caixa</option>
                <option value='MI' >Regime Competência</option>
    </select>
        
    <div class="filter-manager">
    <table class="filter-buttons">
        <tr>
            <td class="filtrar-por-label" >Filtrar por:</td>
            <td>
                                                <div class="btn-group filter-button" filter-type="status">
                    <button class="btn btn-small filter-label">Status</button>
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
                            <a href="javascript:void(0);" filter-value="Agendado"><span class='badge badge-status Agendado'>&nbsp;</span>Agendado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Confirmado"><span class='badge badge-status Confirmado'>&nbsp;</span>Confirmado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Conciliado"><span class='badge badge-status Conciliado'>&nbsp;</span>Conciliado</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" filter-value="Pendente"><span class='badge badge-status Pendente'>&nbsp;</span>Pendente</a>
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
        <li class="divider"></li>                        <li><a href='javascript:void(0)' filter-value='905899'>Administrativas</a><li><a href='javascript:void(0)' filter-value='908590'>Administrativas/AASP</a></li><li><a href='javascript:void(0)' filter-value='905901'>Administrativas/Aluguel</a></li><li><a href='javascript:void(0)' filter-value='908589'>Administrativas/Contabilidade</a></li><li><a href='javascript:void(0)' filter-value='905902'>Administrativas/Correios</a></li><li><a href='javascript:void(0)' filter-value='905908'>Administrativas/Energia Elétrica</a></li><li><a href='javascript:void(0)' filter-value='909393'>Administrativas/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905909'>Administrativas/Locação de Bens / Copiadora</a></li><li><a href='javascript:void(0)' filter-value='905904'>Administrativas/Material de Consumo</a></li><li><a href='javascript:void(0)' filter-value='909396'>Administrativas/Papelaria</a></li><li><a href='javascript:void(0)' filter-value='909406'>Administrativas/Pedágio - SEM PARAR</a></li><li><a href='javascript:void(0)' filter-value='905903'>Administrativas/Periódicos / Assinaturas</a></li><li><a href='javascript:void(0)' filter-value='909397'>Administrativas/Prestação de Serviços</a></li><li><a href='javascript:void(0)' filter-value='909398'>Administrativas/Produtos de Limpeza</a></li><li><a href='javascript:void(0)' filter-value='905900'>Administrativas/Pró-labore</a></li><li><a href='javascript:void(0)' filter-value='909399'>Administrativas/Reembolso</a></li><li><a href='javascript:void(0)' filter-value='910026'>Administrativas/Saque</a></li><li><a href='javascript:void(0)' filter-value='909404'>Administrativas/Segurança</a></li><li><a href='javascript:void(0)' filter-value='909405'>Administrativas/Seguros</a></li><li><a href='javascript:void(0)' filter-value='909407'>Administrativas/Sindicato</a></li><li><a href='javascript:void(0)' filter-value='909408'>Administrativas/Supermercado</a></li><li><a href='javascript:void(0)' filter-value='905905'>Administrativas/Tarifas Bancárias</a></li><li><a href='javascript:void(0)' filter-value='905907'>Administrativas/Telefone Celular / Fixo e Internet</a></li><li><a href='javascript:void(0)' filter-value='921236'>Administrativas/Transferência entre Contas</a></li><li><a href='javascript:void(0)' filter-value='908591'>Administrativas/Água Mineral</a></li><li><a href='javascript:void(0)' filter-value='905906'>Administrativas/Água e Esgoto</a></li></li><li><a href='javascript:void(0)' filter-value='905924'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905926'>Financeiras/Juros de Mora</a></li><li><a href='javascript:void(0)' filter-value='905925'>Financeiras/Juros e Encargos</a></li><li><a href='javascript:void(0)' filter-value='909409'>Financeiras/Tarifas Bancárias</a></li></li><li><a href='javascript:void(0)' filter-value='905932'>Gerais</a><li><a href='javascript:void(0)' filter-value='905939'>Gerais/Bens / Ativo</a></li><li><a href='javascript:void(0)' filter-value='905935'>Gerais/Combustível</a></li><li><a href='javascript:void(0)' filter-value='908592'>Gerais/Correspondentes</a></li><li><a href='javascript:void(0)' filter-value='908593'>Gerais/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905936'>Gerais/Despesas de Viagens</a></li><li><a href='javascript:void(0)' filter-value='909391'>Gerais/Doações</a></li><li><a href='javascript:void(0)' filter-value='905934'>Gerais/Manutenção de veículos</a></li><li><a href='javascript:void(0)' filter-value='909395'>Gerais/Manutenções e Reparos</a></li><li><a href='javascript:void(0)' filter-value='908594'>Gerais/OAB</a></li><li><a href='javascript:void(0)' filter-value='905937'>Gerais/Propaganda e publicidade  </a></li><li><a href='javascript:void(0)' filter-value='909410'>Gerais/Veículos</a></li></li><li><a href='javascript:void(0)' filter-value='905916'>Impostos</a><li><a href='javascript:void(0)' filter-value='905919'>Impostos/COFINS</a></li><li><a href='javascript:void(0)' filter-value='905920'>Impostos/FGTS</a></li><li><a href='javascript:void(0)' filter-value='905923'>Impostos/INSS</a></li><li><a href='javascript:void(0)' filter-value='905922'>Impostos/IOF</a></li><li><a href='javascript:void(0)' filter-value='905921'>Impostos/IPTU</a></li><li><a href='javascript:void(0)' filter-value='905917'>Impostos/IRPJ</a></li><li><a href='javascript:void(0)' filter-value='909392'>Impostos/ISS</a></li><li><a href='javascript:void(0)' filter-value='905918'>Impostos/PIS</a></li></li><li><a href='javascript:void(0)' filter-value='905928'>Outras Despesas</a></li><li><a href='javascript:void(0)' filter-value='905892'>Pessoal</a><li><a href='javascript:void(0)' filter-value='905893'>Pessoal/Assistência Médica</a></li><li><a href='javascript:void(0)' filter-value='905896'>Pessoal/Encargos Sociais</a></li><li><a href='javascript:void(0)' filter-value='905894'>Pessoal/Estagiários</a></li><li><a href='javascript:void(0)' filter-value='905898'>Pessoal/Refeições</a></li><li><a href='javascript:void(0)' filter-value='909400'>Pessoal/Repasses</a></li><li><a href='javascript:void(0)' filter-value='909402'>Pessoal/Retirada dos Sócios</a></li><li><a href='javascript:void(0)' filter-value='909403'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905895'>Pessoal/Salários</a></li><li><a href='javascript:void(0)' filter-value='905897'>Pessoal/Vale Transporte</a></li></li><li><a href='javascript:void(0)' filter-value='905910'>Financeiras</a><li><a href='javascript:void(0)' filter-value='905912'>Financeiras/Custas Processuais</a></li><li><a href='javascript:void(0)' filter-value='905914'>Financeiras/Honorários</a></li><li><a href='javascript:void(0)' filter-value='905915'>Financeiras/Levantamento Judicial</a></li><li><a href='javascript:void(0)' filter-value='905911'>Financeiras/Rendimentos Aplicações</a></li><li><a href='javascript:void(0)' filter-value='905913'>Financeiras/Resgate Aplicação</a></li><li><a href='javascript:void(0)' filter-value='921002'>Financeiras/Ressarcimento de custas</a></li></li><li><a href='javascript:void(0)' filter-value='905929'>Saque $$$</a></li><li><a href='javascript:void(0)' filter-value='905927'>Transferência entre contas</a></li>                    </ul>
                </div>
                                                <div class="btn-group filter-button" filter-type="conta">
                    <button class="btn btn-small filter-label">Contas</button>
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
        <li class="divider"></li>                        <li><a href="javascript:void(0);" filter-value='0'>Sem conta</a></li>
                        <li><a href='javascript:void(0)' filter-value='34814'>BANCO DO BRASIL</a></li><li><a href='javascript:void(0)' filter-value='34813'>BRADESCO JURIDICO</a></li><li><a href='javascript:void(0)' filter-value='34816'>BRADESCO WERNER/SOLANGE 10030</a></li><li><a href='javascript:void(0)' filter-value='34815'>BRADESCO WERNER/VERA 150300</a></li><li><a href='javascript:void(0)' filter-value='35641'>Braulio</a></li><li><a href='javascript:void(0)' filter-value='34874'>Caixa - Carol</a></li>                    </ul>
                </div>  
                                
            </td>
            <td><div class="btn-group pull-right filter-actions">
        <button class="btn btn-small filter-save qtitle" href="javascript:void(0);" title="Salvar esta configuração de filtragem" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-save"></i>
        </button>
        <button class="btn btn-small filter-restore qtitle" href="javascript:void(0);" title="Restaurar configurações de filtragem salvas" qtitle-data-at="bottom center" qtitle-data-my="top  right">
            <i class="icon-reply"></i>
        </button>
        <button class="btn btn-small filter-clear qtitle" href="javascript:void(0);" title="Remover todos os filtros atuais" qtitle-data-at="bottom center" qtitle-data-my="top right">
            <i class="icon-remove-sign"></i>
        </button>
    </div></td>
        </tr>
    </table>
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_relatorio"></div>
<?php endif; ?>