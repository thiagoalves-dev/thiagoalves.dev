---
extends: _layouts.post
section: content
published: true

date: 2020-05-25
author: Thiago Alves
title: Compartilhe o seu conhecimento no nosso blog
description: Antes mesmo de colocar esse blog no ar, eu já pensava que deveria haver uma forma simples para que outros desenvolvedores pudessem contribuir com o seu conhecimento, sem que houvessem muitas travas no meio do caminho.
keywords: Blog, Conteúdo, Compartilhamento
---

Antes mesmo de colocar esse blog no ar, eu já pensava que deveria haver uma forma simples para que outros desenvolvedores pudessem contribuir com o seu conhecimento, sem que houvessem muitas travas no meio do caminho. Acredito que conseguimos!

Eu não vou aprofundar muito nisso mas, inicialmente, a ideia era desenvolver o blog usando o _Laravel_ para criar um gerenciador de posts, com tudo que tem direito. Foi então que o [Vanderlei](/sobre) veio com a sugestão de usarmos o framework [Jigsaw](https://jigsaw.tighten.co). Além do tempo de desenvolvimento economizado, ainda encontramos uma forma simples de abrir as postas para as contribuições.

Então, hoje vou usar este post para te convidar a compartilhar o teu conhecimento aqui e como é possível fazer isso. Vamos aos passos.

### Instalação

Todo o código do blog está disponível no nosso [github](https://github.com/mastercode-dev/blog). Lá também tem as instruções para instalação e configuração.

Se você já trabalha com _PHP_ e _Laravel_, principalmente, dificilmente terá algum problema em rodar a aplicação na sua máquina local. Eu mesmo fiz o processo algumas vezes para garantir que é simples.

### Os temas

Não há um tema central no blog e, muito menos, um nível de conhecimento obrigatório. Nossa ideia sempre foi ajudar todos os níveis de programadores, inclusive os que ainda nem atuam profissionalmente.

Dito isso, toda a abordagem é bem-vinda. Escreveu uma simples função e acredita que ela pode ser útil para outras pessoas? Compartilha conosco! 

Por outro lado, baseado no conteúdo já compartilhado por aqui, fica muito claro que temos um viés. Então, a nossa prioridade é por conteúdo sobre: _PHP_, _Laravel_, _VueJS_, _Clean Code_. Dificilmente você verá aqui um post falando sobre _Python_, por exemplo.

Também gostamos de assuntos mais abrangentes e menos relacionados com tecnologia, diretamente, como: carreira, _home office_, produtividade, cursos.  

### Criando um post

Partindo do princípio que você já está com o projeto rodando na sua máquina, vou te mostrar como é simples criar um post.

O primeiro passo é criar uma `branch` para que você possa nos enviar um _Pull Request_ ao final deste processo.

Dentro da pasta `source/_posts`, ficam todos os posts do blog. Basta criar um arquivo com a extensão `.md`, considerando que o seu nome é correspondente a `URL` que usará para acessá-lo no navegador. 

Exemplo: `teste-nome.md` é igual a `/blog/teste-nome`.

Abaixo, vou usar uma forma resumida do [primeiro post do nosso blog](/blog/primeiro-post-do-nosso-blog) para te mostrar algumas coisas:

```markdown
---
extends: _layouts.post
section: content

date: 2020-04-16
author: Thiago Alves
title: Primeiro post do nosso blog
description: Falando um pouco sobre a nossa empresa, sobre a criação do blog e o que esperar dele.

---

### Quem é a Mastercode?

A empresa foi fundada em 2017, por [mim](https://linkedin.com/in/thiagomcw) e meu sócio [Vanderlei](https://linkedin.com/in/vanderleiamancio), com a finalidade de prestar serviços de Desenvolvimento de Sistemas para outras empresas. Atividade que se mantém até hoje.

Ambos com pelo menos dez anos de experiência, nossa especialidade é o desenvolvimento web usando a linguagem PHP e o framework Laravel. Mas também temos um bom conhecimento em HTML, CSS, Javascript e VueJS.

### Por que resolvemos criar um blog?
Durante a carreira acumulamos uma base de conhecimento considerável que muitas vezes acaba ficando escondida na nossa mente. 

Então decidimos que chegou a hora de expor esse conhecimento e ajudar, não só pessoas que já atuam na área, mas também aquelas que estão pensando em começar a escrever códigos malucos (risos).

### O que está por vir?
Vamos abordar bastante as tecnologias que já dominamos e também aprofundar em alguns assuntos mais conceituais da profissão como: rotina, comportamento, produtividade e muito mais.

A ideia é ter uma frequência alta de postagens e sem muita enrolação, ou seja, vamos direto ao que interessa.

Nos vemos muito em breve!
```

No bloco de configurações, se preocupe apenas em preencher os campos de: autor, título e descrição. As outras informações, deixe como no exemplo acima, elas serão revisadas no processo de publicação feito por nós. 

Abaixo das configurações, você desenvolve o seu texto usando a linguagem [Markdown](https://pt.wikipedia.org/wiki/Markdown) e pronto!

### Enviando para publicação

Já escreveu? Boa!

Agora você só precisa criar um _Pull Request_ da sua branch para a `master` do projeto e está feito. Se possível, inclua um comentário, nos passando alguma forma de entrar em contato com você para que possamos avisar quando o seu post será publicado.

É possível que solicitemos algum ajuste ou correção no seu post. Isso será feito através dos comentários do _PR_. Feito o `push` dos ajustes, o processo de revisão é realizado novamente.

Agora é só aguardar a data da sua publicação!

### Finalizando

Uma das coisas que aprendi muito rápido nesse processo é o quanto aprendo quando compartilho conhecimento, por mais básico que ele possa parecer. 

Há também uma sensação boa de retribuir o tanto de conteúdo gratuito que já consumi.

Mal posso esperar para ver vários conteúdos sendo compartilhados aqui diariamente.

Nos vemos em breve!