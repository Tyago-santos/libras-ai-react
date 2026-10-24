#!/usr/bin/env python3
"""Adiciona navegação onClick aos <a href="#"> das telas Libras AI."""
import glob
import os
import re

SCREENS = "/home/tiago/projetos/libras-ai-react/src/screens"
ROUTES = {
    "traduzir": "/",
    "translate": "/",
    "histórico": "/historico",
    "history": "/historico",
    "sessões": "/sessoes",
    "configurações": "/configuracoes",
    "settings": "/configuracoes",
    "ajustes": "/configuracoes",
}


def route_for(anchor_tag, inner):
    """Decide a rota pelo aria-label/texto visível do link."""
    blob = (anchor_tag + " " + re.sub(r"<[^>]+>", " ", inner)).lower()
    for key, route in (
        ("sess", "/sessoes"),
        ("history", "/historico"),
        ("histórico", "/historico"),
        ("translate", "/"),
        ("traduzir", "/"),
        ("settings", "/configuracoes"),
        ("configura", "/configuracoes"),
        ("ajustes", "/configuracoes"),
    ):
        if key in blob:
            return route
    return None


for path in sorted(glob.glob(f"{SCREENS}/*.jsx")):
    src = open(path).read()
    changed = 0
    out = []
    i = 0
    for m in re.finditer(r"<a\b[^>]*>", src):
        tag = m.group(0)
        if "onClick" in tag or 'href="#"' not in tag:
            continue
        # captura o conteúdo até </a>
        end = src.find("</a>", m.end())
        inner = src[m.end(): end if end != -1 else m.end() + 400]
        route = route_for(tag, inner)
        if not route:
            continue
        new_tag = tag.replace(
            'href="#"',
            f'href="#" onClick={{(e) => {{ e.preventDefault(); navigate("{route}"); }}}}',
        )
        out.append((m.start(), m.end(), new_tag))
        changed += 1
    for start, end, new_tag in reversed(out):
        src = src[:start] + new_tag + src[end:]
    if changed:
        open(path, "w").write(src)
    print(f"{os.path.basename(path):35} +{changed} links")
