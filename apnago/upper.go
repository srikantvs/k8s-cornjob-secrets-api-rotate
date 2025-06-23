package main

import (
"os"
"text/template"
"github.com/Masterminds/sprig/v3"
)

func main() {
// Template using Sprig's `upper` function
const tmpl = `Original: {{ . }}
Uppercase: {{ . | upper }}
Repeating 5 times {{ . | upper | repeat 5}}
double quote {{ . | quote}}
single quote {{ . | squote}}
base64 {{ . | b64enc}}
time {{ now }}
time unix {{ now | unixEpoch }}
`

// Create a template and register Sprig functions
t := template.Must(template.New("example").Funcs(sprig.FuncMap()).Parse(tmpl))

// Execute the template with a string input
t.Execute(os.Stdout, "Hello!")
}



// to helm iss sprig library ko use karta hai hai bhai.
// go mod init <project_name>
// go get github.com/Masterminds/sprig/v3

