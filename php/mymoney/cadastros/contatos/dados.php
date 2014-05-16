
<div class="btn-toolbar header-contatos md-header cad-header" >
    <div class="btn-group">
        <button class="btn btn-small novo-cad">
            <i class="icon-plus-sign"></i>
            <span>Novo Contato</span>
        </button>
        <button class="btn btn-small contatos-categorias">
            <i class="icon-tags"></i>
            <span>Gerenciar categorias de contato</span>
        </button>
    </div>
                
    <div class="btn-group search-bar" style="margin-left: 20px;">
        <input class="search-contacts" type="text" placeholder="Digite o nome do contato"/>
        <button class="btn btn-small search-trigger" >
            <i class="icon-search"></i>
        </button>
        <button class="btn btn-small search-clear" title="Limpar busca">
            <i class="icon-remove-sign"></i>
        </button>
    </div>
    
    <div class="btn-group pull-right">
        <button class="btn btn-small" id="imprimir_contatos">
            <i class="icon-print"></i>
            <span>Imprimir</span>
        </button>
        <button class="btn btn-small filter-trigger qtitle"  title="Abrir/fechar filtros" qtitle-data-at="bottom center" qtitle-data-my="top right">
        <span class="filter-counter"></span>
        <i class="icon-filter"></i>
        <i class="icon-caret-down"></i>
    </button>    </div>
    
    
    <div class="filter-manager">
    
    <div class="btn-toolbar filter-buttons">
        <span style="font-size: 12px;display: inline-block;vertical-align: middle;font-weight: bold;padding-right: 5px;">Filtrar por: </span>
        <div class="btn-group filter-button" filter-type="tipopessoa">
            <button class="btn btn-small filter-label">Tipo Pessoa</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu filter-list">
                <li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                <li>
                    <a href="javascript:void(0);" filter-value="FISICA">Física</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="JURIDICA">Jurídica</a>
                </li>
            </ul>
        </div>    
        <div class="btn-group filter-button" filter-type="tipocontato">
            <button class="btn btn-small filter-label">Tipo Contato</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu filter-list">
                <li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                <li>
                    <a href="javascript:void(0);" filter-value="CLIENTE">Cliente</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="FORNECEDOR">Fornecedor</a>
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
        <li class="divider"></li>                            </ul>
        </div> 
        <div class="btn-group filter-button" filter-type="sexo">
            <button class="btn btn-small filter-label">Sexo</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu filter-list">
                <li class="filter-xor " >
            <label class="checkbox qtitle" title="Mostra apenas a última opção de filtro escolhida"><input type="checkbox" >Sempre substituir</label>
        </li>
        <li class="divider"></li>                <li>
                    <a href="javascript:void(0);" filter-value="M">Masculino</a>
                </li>
                <li>
                    <a href="javascript:void(0);" filter-value="F">Feminino</a>
                </li>
            </ul>
        </div> 
        
        <div class="btn-group filter-button" filter-type="uf">
            <button class="btn btn-small filter-label">UF</button>
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
        <li class="divider"></li>                                <li>
                    <a href="javascrip:void(0);" filter-value="AC">Acre</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="AL">Alagoas</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="AP">Amapá</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="AM">Amazonas</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="BA">Bahia</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="CE">Ceará</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="DF">Distrito Federal</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="ES">Espírito Santo</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="GO">Goiás</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="MA">Maranhão</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="MT">Mato Grosso</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="MS">Mato Grosso do Sul</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="MG">Minas Gerais</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="PA">Pará</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="PB">Paraíba</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="PR">Paraná</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="PE">Pernambuco</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="PI">Piauí</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="RJ">Rio de Janeiro</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="RN">Rio Grande do Norte</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="RS">Rio Grande do Sul</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="RO">Rondônia</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="R">Roraima</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="SC">Santa Catarina</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="SP">São Paulo</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="SE">Sergipe</a>
                </li>
                                <li>
                    <a href="javascrip:void(0);" filter-value="TO">Tocantins</a>
                </li>
                            </ul>
        </div>   
        
        <div class="btn-group pull-right filter-actions">
            <button class="btn btn-small filter-save" href="javascript:void(0);">
                <i class="icon-save"></i>
            </button>
            <button class="btn btn-small filter-restore" href="javascript:void(0);">
                <i class="icon-reply"></i>
            </button>
            <button class="btn btn-small filter-clear" href="javascript:void(0);">
                <i class="icon-remove-sign"></i>
            </button>
        </div>
        
    </div>    
    <div class="active-filters"></div>
</div></div>
<div id="conteudo_contatos"></div>
