---
extends: _layouts.post
section: content
published: true

date: 2020-05-22
author: Thiago Alves
date_txt: 22 de Maio de 2020
title: 5 reflexões sobre comentários no código
description: desc
keywords: Keys
---

Qualquer programador com alguma experiência e que já tenha trabalhado em equipe já deve ter se deparado com aquele comentário dizendo: "não mexer", "aqui que a mágica acontece" ou "não sei o que isso faz". Isso é praticamente uma tradição já (risos).

Por trás dessa prática inofensiva, aparentemente, uma série de problemas podem estar escondidos no código. Neste post trago algumas reflexões sobre o tema carregadas de alguns conceitos e da minha opinião pessoal.

Legibilidade do código

Se você acabou de escrever um código e ele ficou tão complexo que foi preciso escrever comentários para explicar o que ele faz, muito provavelmente o problema está no fato dele não ser legível o suficiente.

Faça revisões no que escreveu buscando pontos de melhoria e pensando que, algum tempo depois, alguém vai precisar modificar essa lógica, inclusive você mesmo.

Comentários mentirosos

Encontre o erro no comentário abaixo:

// code

Pode parecer bobo, mas imagine que você está corrigindo um erro que está acontecendo em produção, a lógica em questão consome esse método e nem foi você que o implementou. Basicamente, isso pode definir se o problema vai afetar alguns poucos usuários ou algumas centenas.

Comentários desatualizados

Para mim, apenas esse tópico já basta para defender que comentários não devem ser usados. 

Durante meu razoável tempo de experiência, eu jamais fui ajudado por um comentário. Seja meu ou de outro desenvolvedor.

É sempre a mesma história: o camarada escreve aquele método com dezenas de linhas e escreve outras dezenas de linhas pra explicar o que aquilo tudo tá fazendo, uma correção se faz necessária, é feita, mas o comentário não é atualizado. O resto é história (risos).

O melhor remédio é a prevenção

Até pareço o Drauzio Varella falando, mas é verdade.

Alguns fatores que contribuem para criação de comentários: métodos muito grandes, classes com lógica em excesso, nomenclatura de classes, variáveis e métodos incompatíveis com sua realidade. Redobrar o cuidado com essas questões ajuda bastante, vou dar alguns exemplos abaixo.

// code

Comentar somente quando necessário

Iniciantes

Você, jovem gafanhoto, no auge do início da sua carreira como programador, está lendo esse post e ficando apavorado porque comenta cada linha de código que escreve, até mesmo aquelas funções nativas da linguagem pra não esquecer o que fazem. Fique tranquilo, cada coisa no seu tempo. O mais importante agora é o seu progresso. Com o tempo, isso começa a perder o sentido. Apenas tenha consciência de buscar a evolução necessária para abandonar essa prática.

Bugs

O sistema tá dando erro em produção, muitos usuários sendo afetados e você sabe que aquela gambiarra marota vai estancar a sangria? Faça e use um comentário para sinalizar a necessidade de refatoração daquele trecho de código, mas não se esqueça de já colocar uma tarefa na fila para fazer isso, caso não seja possível no momento.

Configurações 

Em alguns frameworks, como no Laravel, é comum que hajam alguns arquivos de configuração cheios de comentários explicando como cada parâmetro opera e quais suas opções de personalização. Como se tratam de arquivos que raramente sofrem alteração, não há problemas nisso.

Finalizando

Há quem pense que isso é uma tremenda bobagem. A famosa invenção de moda. Se esse é o seu caso, tudo bem, trabalhe da forma como achar melhor.

Como eu disse no post "Um dos maiores erros que os desenvolvedores cometem", o mais importante é se manter com a mente aberta para as possibilidades.

Nos vemos em breve!