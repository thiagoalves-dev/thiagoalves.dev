---
date: '2020-06-09'
title: 'Conceitos básicos sobre Code Review'
description: 'Code Review se resume numa prática de revisão de código, como o próprio nome diz, onde um programador revisa uma implementação feita por outro, com o objetivo de encontrar falhas em geral.'
keywords: 'Code Review, Arquitetura, Design Patterns, Legibilidade'
---

Uma das formas de se manter, ao mesmo tempo, a integridade do código e a equipe na mesma página, é aderindo a prática do
_Code Review_. Essa prática se difundiu bastante nos últimos anos e já podemos considerá-la comum entre os times de
desenvolvimento.

Por outro lado, é importante reconhecer que não se trata de um processo muito fácil. Muitos fatores podem contribuir
para que essa tarefa seja dificultada, como: _Pull Requests_ com excesso de alterações, _commits_ mal descritos, falta
de definição sobre convenções, ego. Por isso é muito importante que a equipe esteja alinhada na forma de trabalho.

Se você não faz ideia do que estou falando, _Code Review_ se resume numa prática de revisão de código, como o próprio
nome diz, onde um programador revisa uma implementação feita por outro, com o objetivo de encontrar falhas em geral.

Uma das formas de estruturar essa revisão, é dividindo-a em três segmentos, onde um é pré-requisito para o outro. São
eles:

### Arquitetura

Princípios, convenções, segurança, _design patterns_. A lista pode ser grande e vai variar bastante de acordo com as
regras estabelecidas pelo time, reforçando a importância da comunicação.

Nessa etapa, é possível analisar se a implementação realizada está de acordo com o desenho da aplicação, se as entidades
do sistema e são respeitadas, não contendo classes, regras de negócios e funções em locais inapropriados.

Outra questão importante, é se os testes estão compatíveis com as novas funcionalidades e, claro, se executam
corretamente. Até mesmo para validar se as mudanças não prejudicam outras áreas do sistema, já existentes.

### Legibilidade

As principais ferramentas de hospedagem de código, como _Bitbucket_, _Github_ e _Gitlab_, exibem os _Pull Requests_ numa
página que mais parece um artigo dividido em capítulos, onde é possível ler os arquivos modificados, um por um. O que
ajuda bastante, na hora de avaliar o quão legível está o código modificado.

Nesse momento, é hora de analisar se, ao ler o código, ele deixa claro o que faz. Se você estiver com dificuldades para
entender algum trecho, possivelmente ele precisa de alguns ajustes. Funções e classes com lógica excessiva, tendem a
contribuir para uma legibilidade ruim, e esse preço vem com juros no futuro.

### Formatação e reaproveitamento

Partindo para um critério menos lógico e mais estético, digamos assim, é hora de analisar como está a apresentação do
código e o quão reaproveitável ele é.

Você pode analisar aqui, pontos como: comentários incompatíveis, indentação, nomenclatura de variáveis, classes e
métodos fora do padrão. Atualmente, existem várias ferramentas que possibilitam automatizar esse processo, inclusive
impedindo que o _commit_ seja feito. De qualquer forma, vale dar uma conferida, por precaução.

Também podem fazer parte dessa etapa, sugestões de melhorias na lógica, como alguma refatoração que possibilite um
reaproveitamento do código. Aliás, essas sugestões nem precisam ser um pré-requisito para que o _Pull Request_ seja
aprovado, diferente das anteriores.

### Concluindo

É importante salientar que esse artigo foi pensado num cenário onde há uma equipe de desenvolvimento, onde existem pelo
menos dois profissionais com alguma experiência. As dinâmicas de _Code Review_ podem variar muito de acordo com a
configuração do time. É possível que haja apenas um profissional que revisa o código e estabelece as regras, por
exemplo.

Se você possui alguma experiência diferente, nesse assunto, compartilha conosco nos comentários.

Nos vemos em breve!
