---
extends: _layouts.post
section: content

date: 2020-05-22
author: Thiago Alves
date_txt: 22 de Maio de 2020
title: 5 reflexões sobre comentários no código
description: 'Qualquer programador com alguma experiência, principalmente que já tenha trabalhado em equipe, deve ter se deparado com algum comentário do tipo: "não mexer", "aqui é que a mágica acontece" ou "não sei o que isso faz".'
keywords: Código, Comentários, Legibilidade, Bugs, Configurações
---

Qualquer programador com alguma experiência, principalmente que já tenha trabalhado em equipe, deve ter se deparado com algum comentário do tipo: "não mexer", "aqui é que a mágica acontece" ou "não sei o que isso faz". Já é quase uma tradição.

Por trás dessa prática inofensiva e até engraçada, à primeira vista, uma série de problemas podem estar se escondendo no código. Neste _post_ trago algumas reflexões carregadas de conceitos e da minha opinião sobre o tema.

### Legibilidade do código

Se você acabou de escrever um código e ele ficou tão complexo que foi preciso fazer comentários para explicar o que ele faz, muito provavelmente o problema está no fato dele não estar legível o suficiente.

Faça revisões no que escreveu, buscando pontos de melhoria e pensando que, algum tempo depois, alguém vai precisar modificar essa lógica, inclusive você mesmo.

### Comentários mentirosos

Encontre o erro no comentário abaixo:

```php
// Retorna uma data atual formatada
public function getCurrentMonth() {
    return \Carbon\Carbon::now()->format('d/m/Y');
}
```

Pode parecer bobo, mas imagine você corrigindo um erro que acontece em produção, a lógica em questão consome o método acima e nem foi você que o implementou. Basicamente, isso pode definir se o problema vai afetar alguns poucos usuários ou algumas centenas.

### Comentários desatualizados

Para mim, apenas esse tópico já basta para defender que comentários não devem ser usados. 

Durante o meu razoável tempo de experiência, eu jamais fui ajudado por um comentário. Seja meu ou de outro desenvolvedor.

É sempre a mesma história: o camarada escreve aquele método com dezenas de linhas e outras dezenas de linhas para explicar o que aquilo tudo faz, uma correção é necessária, é feita, mas o comentário não é atualizado. O resto é história (risos).

### O melhor remédio é a prevenção

Até parece o [Drauzio Varella](https://pt.wikipedia.org/wiki/Drauzio_Varella) falando, mas é verdade.

Alguns fatores que contribuem para criação de comentários: métodos muito grandes, classes com lógica excessiva, nomenclatura de classes, variáveis e métodos incompatíveis com a sua função prática. Redobrar o cuidado com essas questões, ajuda bastante. Exemplo abaixo.

```php
// ANTES
// Verifica se o produto tá ativo
function check($object) {
    return $object->status === 'active';
}

// DEPOIS
function isActive(Product $product) {
    return $product->status === 'active';
}
```

### Comentar somente quando necessário

**Iniciantes**

Você, jovem gafanhoto, no AUGE DO INÍCIO da sua carreira como programador, está lendo esse _post_ e ficando apavorado porque comenta cada linha de código que escreve, até mesmo aquelas funções nativas da linguagem para não esquecer o que elas fazem. Fique tranquilo, cada coisa no seu tempo. O mais importante agora é o seu progresso. Com o tempo, isso começa a perder o sentido. Apenas tenha consciência de buscar a evolução necessária para abandonar essa prática.

**Bugs**

O sistema tá dando erro em produção, muitos usuários sendo afetados e você sabe que aquela gambiarra marota vai estancar a sangria? A faça e use um comentário para sinalizar a necessidade de refatoração daquele trecho de código, mas não se esqueça de já colocar uma tarefa na fila para fazer isso, caso não seja possível refatorar no momento.

**Configurações** 

Em alguns frameworks, como no _Laravel_, é comum que hajam alguns arquivos de configuração cheios de comentários explicando como cada parâmetro opera e quais as suas opções de personalização. Como se tratam de arquivos que raramente sofrem alteração, não há problemas. Replicar essa prática nos seus arquivos também pode ser uma boa.

```php
/*
|--------------------------------------------------------------------------
| Application Timezone
|--------------------------------------------------------------------------
|
| Here you may specify the default timezone for your application, which
| will be used by the PHP date and date-time functions. We have gone
| ahead and set this to a sensible default for you out of the box.
|
*/

'timezone' => 'Europe/London',
```

### Finalizando

Há quem pense que isso é uma tremenda bobagem. A famosa invenção de moda. Se esse é o seu caso, tudo bem, trabalhe da forma como achar melhor.

Como eu disse no post ["Um dos maiores erros que os desenvolvedores cometem"](/blog/um-dos-maiores-erros-que-os-desenvolvedores-cometem), o mais importante é se manter com a mente aberta para as possibilidades.

Nos vemos em breve!