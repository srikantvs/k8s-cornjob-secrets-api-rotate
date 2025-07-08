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
    name: "api-key-secret1",
    namespace,
  })
  let secret = res


  // Destructure and rename the key (since it has a hyphen)
  let {newKey, oldKey} = res.data


  console.log(res.data);

  console.log( Buffer.from(newKey, 'base64').toString('utf-8'))
  console.log(Buffer.from(oldKey, 'base64').toString('utf-8'));


// Updated new key object
  const updatedNewKeyObj = {
    key: "updatedNewKeyObj",
    isActive: "y",
    expiresAt: "2026-07-08T00:00:00Z"
  };

  const updatedNewKeyBase64 = Buffer.from(JSON.stringify(updatedNewKeyObj)).toString('base64');

  // Assign back properly to secret.data
  secret.data['newKey'] = updatedNewKeyBase64;

  await k8sApi.replaceNamespacedSecret({
    namespace,
    name: "api-key-secret1",
    body: secret,
  })

} catch (err) {
  console.error(err)
}

// console.log(Buffer.from('FINAL_KEY').toString('base64'))
