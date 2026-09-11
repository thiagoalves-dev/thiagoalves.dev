/**
 * Shiki theme that reproduces the Spotlight template's Prism palette.
 *
 * The template highlights code with Prism (@mapbox/rehype-prism) and colours the tokens with the
 * `.token.*` rules from its prism.css. Nuxt Content highlights with Shiki instead, so the palette
 * has to be restated here as a TextMate theme to keep the code blocks visually identical.
 *
 * Colours are the **Tailwind 4** palette, read from the template's own stylesheet — NOT the
 * Tailwind 3 values, which differ enough to be visible (pink-400 moved #f472b6 -> #fb64b6 and
 * teal-300 moved #5eead4 -> #46edd5).
 *
 * Prism's mapping, which this mirrors:
 *   base                                          zinc-100  #f4f4f5
 *   tag / class-name / selector / function        pink-400  #fb64b6
 *   module (import/export specifiers)             pink-400  #fb64b6
 *   attr-name / keyword / rule / pseudo-class     zinc-300  #d4d4d8
 *   attr-value / class / string / property        teal-300  #46edd5
 *   punctuation / attr-equals                     zinc-500  #71717b
 *   unit / css function                           sky-200   #b8e6fe
 *   comment / operator / combinator               zinc-400  #9f9fa9
 *
 * Note the Prism distinction this theme has to preserve: `operator` (=, +, ->) is zinc-400, while
 * `punctuation` (; :: . , () {}) is zinc-500. Shiki's default scopes put several of those in the
 * wrong bucket, so the punctuation scopes are enumerated explicitly below.
 *
 * Code blocks are dark in both light and dark mode (the prose styles give <pre> a zinc-900
 * background), so a single theme covers both colour schemes.
 */
const BASE = '#f4f4f5'; // zinc-100
const PINK = '#fb64b6'; // pink-400
const ZINC300 = '#d4d4d8';
const TEAL = '#46edd5'; // teal-300
const ZINC500 = '#71717b';
const SKY = '#b8e6fe'; // sky-200
const ZINC400 = '#9f9fa9';

export const spotlightPrism = {
  name: 'spotlight-prism',
  type: 'dark',
  colors: {
    'editor.foreground': BASE,
    'editor.background': '#00000000',
  },
  tokenColors: [
    // comment / operator / combinator -> zinc-400
    {
      scope: ['comment', 'punctuation.definition.comment', 'keyword.operator', 'keyword.operator.assignment'],
      settings: { foreground: ZINC400 },
    },

    // punctuation -> zinc-500. Enumerated so that `;`, `::`, `.` and brackets land here rather than
    // in the operator bucket, which is where Shiki's defaults put some of them.
    {
      scope: [
        'punctuation',
        'punctuation.definition',
        'punctuation.section',
        'punctuation.separator',
        'punctuation.terminator',
        'punctuation.accessor',
        'keyword.operator.accessor',
        'keyword.operator.namespace',
        'meta.delimiter',
        'meta.brace',
      ],
      settings: { foreground: ZINC500 },
    },

    // import/export specifiers -> pink-400 (Prism's `.token.module`)
    {
      scope: ['keyword.control.import', 'keyword.control.export', 'keyword.control.from', 'meta.import', 'meta.export'],
      settings: { foreground: PINK },
    },

    // keyword / storage -> zinc-300
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'variable.language'],
      settings: { foreground: ZINC300 },
    },

    // tag / class-name / function -> pink-400
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call.generic',
        'entity.name.tag',
        'entity.name.class',
        'entity.name.type',
        'entity.name.namespace',
        'support.class',
        'support.type',
        'entity.other.attribute-name.class',
        'entity.other.attribute-name.id',
      ],
      settings: { foreground: PINK },
    },

    // string / attr-value / property -> teal-300. The string delimiters are included so the quote
    // marks match the string body, the way Prism's `.token.string` covers them.
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'punctuation.definition.string',
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
        'constant.other.symbol',
        'entity.other.attribute-name',
        'support.type.property-name',
        'meta.object-literal.key',
        'variable.other.property',
        'variable.other.object.property',
      ],
      settings: { foreground: TEAL },
    },

    // unit / css function -> sky-200
    {
      scope: ['keyword.other.unit', 'constant.numeric.css', 'support.function.misc.css'],
      settings: { foreground: SKY },
    },

    // everything else falls back to the base colour
    { scope: ['constant.numeric', 'constant.language', 'variable', 'variable.other'], settings: { foreground: BASE } },
  ],
};

export default spotlightPrism;
