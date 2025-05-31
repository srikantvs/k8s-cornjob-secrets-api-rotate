async function main() {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((json) => console.log(json))

  console.log(process.env.APPLICATION_NAME)
  console.log(process.env.POD_NAME)
}

main()
