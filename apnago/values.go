/*
In Helm, {{ .Values }} refers to the values passed into the chart via values.yaml.

In Go templates, this is just like passing a map or struct into the template and accessing its fields.
*/

package main

import (
"os"
"text/template"
)

func main() {
// Simulate .Values as a map, key and value both are string
values := map[string]string{
"appName": "my-app",
"env":     "production",
}

// Template using .Values.appName and .Values.env
tmplText := `
App Name: {{ .appName }}
Environment: {{ .env }}
`
/*

🔧 1. template.New("templatename")
This creates a new template object with the name "templatename".

Think of this like creating a blank form.
The name is optional but useful if you want to define multiple templates and refer to them later (like define and template in Helm).
🧩 2. .Parse(tmplText)
This takes your template string (like "Hello, {{ . }}") and parses it into a usable template.

It reads the string and understands where the placeholders ({{ . }}, {{ .name }}, etc.) are.
If there’s a syntax error in the template, this will return an error.
🛡️ 3. template.Must(...)
This is a helper function that says:

“If there’s an error while parsing the template, crash the program immediately.”

Why? Because if your template is broken, there’s no point continuing.

Without Must:

tmpl, err := template.New("templatename").Parse(tmplText)
if err != nil {
    // handle the error
}


With Must:

tmpl := template.Must(template.New("templatename").Parse(tmplText))


It’s just a shortcut for beginners or when you’re sure the template is correct.

*/

tmpl := template.Must(template.New("templatenaame").Parse(tmplText))
tmpl.Execute(os.Stdout, values) // like before we are passing values to the templatenaame then it will replace in tmplText 
}
