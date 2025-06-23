package main

/**

What is {{ }} in Go Templates?
In Go templates, {{ }} is used to insert dynamic content.

Think of it like this:

{{ }} is a placeholder.
Whatever you put inside {{ }} will be evaluated and replaced with actual data when the template runs.

What is . (dot) inside {{ }}?
The dot . means:

“the current data that I passed into the template.”

*/

import (
	"fmt"
	"os"
	"text/template"
)

func main() {
	// template.New(...).Parse(...) = create a template
	tmpl, _ := template.New("mytemplate").Parse("{{ . }}") // tmpl, _ := ... = store the result in tmpl, ignore the error
	tmpl.Execute(os.Stdout, "Hello World")                 // “Run the template and print the result to the terminal.” os.Stdout → to print to terminal

	f, _ := os.Create("./output.txt")
	tmpl.Execute(f, "Hello World from file man.")

	dir, _ := os.Getwd()
	fmt.Println("\nCurrent working directory:", dir)

}

/*
{{ . }}	Action	Insert the current context
{{ .name }}	Action	Access a field or key from the context
{{ if ... }}	Action	Conditional logic
{{ range ... }}	Action	Looping over data
*/
