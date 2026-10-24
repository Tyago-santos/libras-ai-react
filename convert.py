#!/usr/bin/env python3
"""Converte os HTMLs exportados do Stitch em componentes React (JSX)."""
import html
import os
import re

SRC = "/home/tiago/projetos/libras-ai-stitch/screens"
OUT = "/home/tiago/projetos/libras-ai-react/src/screens"
os.makedirs(OUT, exist_ok=True)

# slug -> (nome do componente, rotas extras de navegação do botão mic principal)
TELAS = {
    "traduzir-pronto-para-ouvir": ("TraduzirProntoParaOuvir", "/ouvindo-fala"),
    "traduzir-ouvindo-fala": ("TraduzirOuvindoFala", "/avatar-sinalizando"),
    "traduzir-avatar-sinalizando": ("TraduzirAvatarSinalizando", "/avatar-sinalizando"),
    "libras-ai-pronto-para-ouvir-inativo": ("ProntoInativo", "/tempo-real"),
    "libras-ai-ouvindo-em-tempo-real": ("OuvindoTempoReal", "/pronto-inativo"),
    "libras-ai-hist-rico-de-conversas": ("HistoricoConversas", "/"),
    "hist-rico-de-sess-es": ("HistoricoSessoes", "/"),
    "libras-ai-configura-es-e-acessibilidade": ("Configuracoes", "/"),
    "configura-es-e-acessibilidade": ("Acessibilidade", "/"),
}

PATHS = {"traduzir": "/", "historico": "/historico", "configuracoes": "/configuracoes"}


def attr_str(name, value):
    """Renderiza um atributo JSX."""
    return f'{name}="{html.escape(value, quote=True)}"'


def convert_attrs(tag):
    """Converte atributos HTML de uma tag para JSX."""
    # data-alt -> alt (usa como alt principal)
    m = re.search(r'\sdata-alt="([^"]*)"', tag)
    if m:
        alt_val = m.group(1)
        tag = tag[: m.start()] + tag[m.end():]
        tag = re.sub(r'\salt="[^"]*"', "", tag)
        tag = tag.replace("<img", f"<img {attr_str('alt', alt_val)}", 1)

    # class -> className
    tag = re.sub(r'\sclass="', ' className="', tag)

    # style string -> object
    def style_obj(mm):
        pairs = []
        for decl in mm.group(1).split(";"):
            if ":" not in decl:
                continue
            k, v = decl.split(":", 1)
            key = re.sub(r"-([a-z])", lambda x: x.group(1).upper(), k.strip())
            pairs.append(f'{key}: "{v.strip()}"')
        return " style={{" + ", ".join(pairs) + "}}"

    tag = re.sub(r'\sstyle="([^"]*)"', style_obj, tag)

    # href="#" com data-path -> onClick navigate
    def nav(mm):
        whole, path = mm.group(0), mm.group(1)
        if "data-path" in whole or 'href="#"' in whole:
            route = PATHS.get(path, "/")
            # remove o data-path (o navigate assume o papel)
            whole = re.sub(r'\sdata-path="[^"]*"', "", whole)
            whole = whole.replace(
                'href="#"',
                f'href="#" onClick={{(e) => {{ e.preventDefault(); navigate("{route}"); }}}}',
            )
        return whole

    tag = re.sub(r'<a\b([^>]*?)data-path="([^"]*)"', lambda mm: nav(mm), tag, count=0)
    # também trata <a ... href="#" data-path remanescentes
    def fix_anchor(mm):
        attrs = mm.group(0)
        dm = re.search(r'data-path="([^"]*)"', attrs)
        if dm and 'onClick' not in attrs:
            route = PATHS.get(dm.group(1), "/")
            attrs = re.sub(r'\sdata-path="[^"]*"', "", attrs)
            attrs = attrs.replace(
                'href="#"',
                f'href="#" onClick={{(e) => {{ e.preventDefault(); navigate("{route}"); }}}}',
            )
        return attrs

    tag = re.sub(r"<a\b[^>]*>", fix_anchor, tag)

    return tag


def convert_body(body):
    # remove scripts e comentários HTML
    body = re.sub(r"<script\b.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    # converte tag por tag
    body = re.sub(r"<[^>]+>", lambda m: convert_attrs(m.group(0)), body)
    # entidades HTML comuns
    body = body.replace("&amp;", "&").replace("&nbsp;", " ")
    body = body.replace("&quot;", '"').replace("&#39;", "'")
    # normaliza espaços em branco entre tags
    body = re.sub(r"\n\s*\n", "\n", body)
    return body.strip()


def build(slug, comp, mic_route):
    raw = open(f"{SRC}/{slug}.html").read()
    m = re.search(r"<body[^>]*>(.*)</body>", raw, flags=re.S)
    body = convert_body(m.group(1))

    # envolve em colchetes o conteúdo raiz (header/main/nav) — já é JSX válido
    needs_nav_hook = 'navigate(' in body

    jsx = f"""import {{ useNavigate }} from "react-router-dom";

export default function {comp}() {{
  const navigate = useNavigate();

  return (
    <>
{body}
    </>
  );
}}
"""
    # aplica navegação no botão mic principal (id="mic-action-btn")
    if "mic-action-btn" in body:
        jsx = jsx.replace(
            'id="mic-action-btn" type="button"',
            f'id="mic-action-btn" type="button" onClick={{() => navigate("{mic_route}")}}',
        )
        jsx = jsx.replace(
            'type="button" id="mic-action-btn"',
            f'type="button" id="mic-action-btn" onClick={{() => navigate("{mic_route}")}}',
        )

    open(f"{OUT}/{comp}.jsx", "w").write(jsx)
    print(f"  {slug}.html -> {comp}.jsx  ({len(jsx)} bytes)")


print("Convertendo telas:")
for slug, (comp, mic) in TELAS.items():
    build(slug, comp, mic)
print("OK")
