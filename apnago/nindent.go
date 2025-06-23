package main

import (
	"os"
	"text/template"

	"github.com/Masterminds/sprig/v3"
)

func main() {
	const tmpl = `
Original:
{{ .Text }}

With indent 4:
{{ .Text | indent 4 }}

With nindent 4:
{{ .Text | nindent 4 }}
`

	data := map[string]string{
		"Text": "Line one\nLine two\nLine three",
	}

	t := template.Must(template.New("example").Funcs(sprig.TxtFuncMap()).Parse(tmpl))
	t.Execute(os.Stdout, data)
}

// indent
// The indent function indents every line in a given string to the specified indent width. This is useful when aligning multi-line strings:

// indent 4 $lots_of_text
// The above will indent every line of text by 4 space characters.

// nindent
// The nindent function is the same as the indent function, but prepends a new line to the beginning of the string.

// nindent 4 $lots_of_text
// The above will indent every line of text by 4 space characters and add a new line to the beginning.
