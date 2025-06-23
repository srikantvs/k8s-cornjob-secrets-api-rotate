package main

import (
"os"
"text/template"
)

func main() {
// A slice (list) of strings
fruits := []string{"apple", "banana", "cherry"}

// Template that loops over the list
tmplText := `
Fruits:
{{ range . }}
- {{ . }}
{{ end }}
`

tmpl := template.Must(template.New("sometempname").Parse(tmplText))
tmpl.Execute(os.Stdout, fruits)
}
// {{ . }} means current value man
// fruits is a slice of strings.
// {{ range . }} starts a loop over the list.
// Inside the loop, . becomes the current item (like "apple", then "banana", etc.).
// {{ end }} closes the loop.