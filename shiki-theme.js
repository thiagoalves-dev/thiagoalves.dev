/**
 * Shiki theme that reproduces the Spotlight template's Prism palette.
 *
 * The template highlights code with Prism (@mapbox/rehype-prism) and colours the tokens with the
 * `.token.*` rules in app/assets/css/main.css. Nuxt Content highlights with Shiki instead, so the
 * palette has to be restated here as a TextMate theme to keep the code blocks visually identical.
 *
 * Source of truth — main.css:
 *   base                                          zinc-100  #f4f4f5
 *   tag / class-name / selector / function        pink-400  #f472b6
 *   module (import/export specifiers)             pink-400  #f472b6
 *   attr-name / keyword / rule / pseudo-class     zinc-300  #d4d4d8
 *   attr-value / class / string / property        teal-300  #5eead4
 *   punctuation / attr-equals                     zinc-500  #71717a
 *   unit / css function                           sky-200   #bae6fd
 *   comment / operator / combinator               zinc-400  #a1a1aa
 *
 * Code blocks are dark in both light and dark mode (the prose styles give <pre> a zinc-900
 * background), so a single theme covers both colour schemes.
 */
const BASE = '#f4f4f5';
const PINK = '#f472b6';
const ZINC300 = '#d4d4d8';
const TEAL = '#5eead4';
const ZINC500 = '#71717a';
const SKY = '#bae6fd';
const ZINC400 = '#a1a1aa';

export const spotlightPrism = {
  name: 'spotlight-prism',
  type: 'dark',
  colors: {
    'editor.foreground': BASE,
    'editor.background': '#00000000',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: ZINC400 } },
    {
      scope: ['keyword.operator', 'meta.brace', 'punctuation.separator', 'punctuation.terminator'],
      settings: { foreground: ZINC400 },
    },
    {
      scope: ['punctuation', 'punctuation.definition', 'punctuation.section', 'meta.delimiter'],
      settings: { foreground: ZINC500 },
    },
    {
      scope: ['keyword.control.import', 'keyword.control.export', 'keyword.control.from', 'meta.import', 'meta.export'],
      settings: { foreground: PINK },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'variable.language'],
      settings: { foreground: ZINC300 },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call.generic',
        'entity.name.tag',
        'entity.name.class',
        'entity.name.type',
        'support.class',
        'entity.other.attribute-name.class',
        'entity.other.attribute-name.id',
      ],
      settings: { foreground: PINK },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'constant.other.symbol',
        'entity.other.attribute-name',
        'support.type.property-name',
        'meta.object-literal.key',
        'variable.other.property',
        'variable.other.object.property',
      ],
      settings: { foreground: TEAL },
    },
    {
      scope: ['keyword.other.unit', 'constant.numeric.css', 'support.function.misc.css'],
      settings: { foreground: SKY },
    },
    { scope: ['constant.numeric', 'constant.language', 'variable', 'variable.other'], settings: { foreground: BASE } },
  ],
};

export default spotlightPrism;
