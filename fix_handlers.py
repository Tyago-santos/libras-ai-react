#!/usr/bin/env python3
"""Converte onclick="..." (HTML) em onClick={...} (React) + adiciona imports."""
import glob
import os
import re

SCREENS = "/home/tiago/projetos/libras-ai-react/src/screens"
FUNCS = {
    "toggleSwitch", "setTextSize", "setAvatarSpeed", "setSpeed", "selectPalette",
    "copySnippet", "playReplay", "toggleFavorite", "triggerNativeToast", "showToast",
}


def to_jsx_handler(value):
    """onclick="toggleSwitch(this)" -> (e) => toggleSwitch(e.currentTarget)"""
    v = value.strip().rstrip(";")
    # comandos múltiplos (event.preventDefault(); triggerNativeToast('...'))
    if ";" in v:
        stmts = [s.strip() for s in v.split(";") if s.strip()]
        body = []
        for s in stmts:
            s = re.sub(r"\bevent\b", "e", s)
            s = s.replace("this)", "e.currentTarget)")
            body.append(s)
        return "{(e) => { " + "; ".join(body) + "; }}"
    v = re.sub(r"\bevent\b", "e", v)
    v = v.replace("this)", "e.currentTarget)")
    return "{(e) => " + v + "}"


for path in sorted(glob.glob(f"{SCREENS}/*.jsx")):
    src = open(path).read()
    if " onclick=" not in src and " onClick{" not in src:
        continue

    used = set()

    used = set()

    def repl(m):
        value = m.group(1)
        for fn in FUNCS:
            if fn in value:
                used.add(fn)
        return " onClick=" + to_jsx_handler(value)

    src = re.sub(r'\sonclick="([^"]*)"', repl, src)
    # corrige o padrão gerado com '=' ausente (onClick{ -> onClick={)
    src = src.replace(" onClick{", " onClick={")

    # import only the functions used (from ../interactions.js)
    imports = sorted(used)
    if imports:
        imp = f'import {{ {", ".join(imports)} }} from "../interactions.js";\n'
        src = re.sub(r'(import \{ useNavigate \} from "react-router-dom";\n)',
                     r"\1" + imp, src, count=1)
        if "from \"../interactions.js\"" not in src:
            src = imp + src

    open(path, "w").write(src)
    print(f"{os.path.basename(path):35} -> {', '.join(imports)}")
