---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-06-07
author: Thiago Alves
title: 5 fatores importantes na estruturação do código
description: Atualmente, acredito que o momento mais complexo é sempre o início de um projeto. A hora de escolher o que e como será usado, como organizar, que estrutura seguir, diretrizes, padrões.
keywords: Estrutura, UML, MER, Fluxograma, Testes, Design Patterns, SOLID
---

Dias atrás, eu conversava com um amigo, iniciante na programação. Num determinado momento, ele perguntou qual eu acreditava ser a maior diferença entre um programador júnior e um sênior, do ponto de vista prático.

Relembrando a minha trajetória, a resposta veio fácil: com o passar dos anos, pensamos mais e escrevemos menos. Certamente existem várias e, sinceramente, nem sei se essa é realmente a maior. A questão é que essa conversa fez eu refletir bastante sobre como a minha forma de trabalhar mudou com o tempo, felizmente.

Atualmente, acredito que o momento mais complexo é sempre o início de um projeto. A hora de escolher o que e como será usado, como organizar, que estrutura seguir, diretrizes, padrões.

Coincidentemente, essa semana, deparei com um artigo (referenciado no rodapé) que levanta 5 pontos importantes sobre estruturação de código. Então, resolvi analisar esses pontos e dar a minha versão sobre eles.

### Desenhos da aplicação

Antes de começar as escrever as suas primeiras linhas de código, é recomendado que inicie o seu projeto desenhando algumas questões importantes do mesmo.

Nos últimos anos, pude notar que gastar algumas horas nessa fase, pode fazer uma grande diferença lá na frente. Não precisa de nada muito elaborado, pode ser feito até no papel.

Você pode trabalhar com UML (_Unified Modeling Language_), fluxogramas, modelagem de dados (MER). Existem outros, mas considero que esses são os mais importantes e é perfeitamente possível trabalhar com eles em conjunto. A ideia é entender os comportamentos que o sistema deve ter, identificar etapas e possíveis pontos de colisão. Além de definir as entidades do sistema, que dados vão possuir e como eles serão salvos.

Nessa fase, quanto mais dúvidas surgirem e mais elas forem discutidas, melhor. É importante que a equipe participe das decisões, para que todos sigam "o combinado" na hora de implementar.

### Convenções de código

O primeiro passo para se construir um ambiente saudável entre programadores, que compartilham o mesmo código, é definir como ele deve ser escrito.

Você que trabalha sozinho e acredita que isso não faz parte da sua realidade, não se engane, você vai evoluir com o tempo e, possivelmente, terá que fazer manutenção num código bagunçado e com a legibilidade comprometida.

Atualmente, esse trabalho está bastante facilitado. A maioria das linguagens que conheço, possuem as suas variadas convenções. Além disso, existem ferramentas capazes de fazer uma validação do código para identificar se o mesmo obedece às regras corretamente. Os próprios editores atuais, conseguem se integrar com essas ferramentas e validar o código enquanto ele ainda é escrito.

### Regras para funções e classes

Esse é sem dúvida um dos assuntos que eu mais gosto na programação. Escrever código limpo tem sido uma das minhas obsessões nos últimos anos. Isso está diretamente ligado a escrever pouco, ou seja, funções e classes pequenas focadas num único objetivo.

Tempos atrás, escrevi aqui sobre o [princípio da responsabilidade única](/blog/clean-code-principio-da-responsabilidade-unica-do-solid). Também já falei sobre os princípios do [aberto/fechado](/blog/clean-code-principio-do-aberto-fechado-do-solid) e da [substituição de Liskov](/blog/solid-principio-da-substituicao-de-liskov). Vale a pena conferir!

Basicamente, o que quero dizer é que: quanto mais lógica as suas funções e/ou classes possuírem, mais problemas elas podem causar e mais difícil será de mantê-las. Uma função que faz uma única coisa, que possui parâmetro e retorno tipificados, dificilmente dará manutenção mais de uma vez.

### Design Patterns

Se você não está familiarizado com o assunto, _design patterns_ nada mais são do que formas generalizadas de resolver problemas recorrentes. Não se trata de um _framework_, mas sim de uma abstração de problemas e desafios específicos. Por exemplo, usar uma classe para reunir uma série de funções de outras classes, que tem um assunto em comum, usando o [Facade Pattern](https://en.wikipedia.org/wiki/Facade_pattern).

Quando você estiver com problemas para estruturar uma parte da lógica, procure por algum _pattern_ que se encaixe na sua necessidade e aplique-o. Na programação, muitas vezes a melhor saída é simplesmente seguir o caminho que alguém já percorreu, ao invés de tentar criar algo mirabolante. Isso também contribui para o compartilhamento do código entre a equipe, uma vez que o programador entenda que padrão foi seguido.

### Testes automatizados

Pode parecer estranho que haja um tópico como esse num artigo que fala sobre estruturação de código, mas já vou explicar.

Até agora, só falamos em como fazer. Então, chegou a hora de falar sobre como validar o que foi feito. Os testes vão nos ajudar a garantir, de alguma forma, que os quatro tópicos anteriores estão aplicados. Atualmente, existem testes para praticamente todas as áreas do sistema. Como dito anteriormente, até a escrita do código pode ser validada.

Uma das formas de saber se uma função foi bem escrita, é o quão simples ela é de ser testada. Se está difícil escrever os testes sobre um trecho de código, provavelmente ele merece uma refatoração ou reestruturação. Principalmente se tratando de testes unitários.

Ainda vou aprofundar bem mais sobre esse assunto aqui no blog mas, inicialmente, eu diria que se você não escreve testes na sua aplicação, nem deveria estudar sobre padrões e boas práticas.

### Concluindo

As pessoas tendem a usar a falta de tempo como desculpa para pular etapas importantes do processo de desenvolvimento de um sistema. Quando, na verdade, estamos falando de práticas que podem a acelerar as coisas. Posso dizer que nunca ouvi um profissional reclamando por ter desenhado modelo de dados para o seu sistema.

Se você está numa jornada para se tornar um programador mais completo, dedique tempo para estruturar melhor os seus projetos. 

Nos vemos em breve!

Referência: [Daan, 5 Lessons I’ve Learned on How to Structure Code](https://levelup.gitconnected.com/5-lessons-ive-learned-on-how-to-structure-code-6d662df0fd1f).

