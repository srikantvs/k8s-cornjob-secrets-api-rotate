// console.log("Hello from index.js")

import express from "express"
import * as k8s from "@kubernetes/client-node"

const app = express()
app.use(express.json())


const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

const namespace = "default"
// https://github.com/kubernetes-client/javascript/issues/2208#issuecomment-2646002431
try {
  const res = await k8sApi.readNamespacedSecret({
    name: "dotfile-secret",
    namespace,
  })
  let secret = res

  console.log(res)
  // Destructure and rename the key (since it has a hyphen)
  let { "secret-file": initialKey } = res.data
  console.log(initialKey)

  // update the initialKey
  const finalKey = Buffer.from("FINAL_KEY_"+new Date()).toString("base64")
  const newKey = { "secret-file": finalKey }
  secret.data = newKey
  await k8sApi.replaceNamespacedSecret({
    namespace,
    name: "dotfile-secret",
    body: secret,
  })

} catch (err) {
  console.error(err)
}

// console.log(Buffer.from('FINAL_KEY').toString('base64'))
