// console.log("Hello from index.js")
// to make a kubernetes secret
import express from "express"
import * as k8s from "@kubernetes/client-node"

const app = express()
app.use(express.json())


const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

const namespace = "default"
// https://github.com/kubernetes-client/javascript/issues/2208#issuecomment-2646002431

// Function to create or update a Kubernetes secret
async function upsertSecret(namespace, secretName, dataObj) {
  // Encode each value in dataObj to base64
  const encodedData = {};
  for (const key in dataObj) {
    encodedData[key] = Buffer.from(dataObj[key]).toString('base64');
  }

  const secretManifest = {
    metadata: { name: secretName, namespace },
    type: "Opaque",
    data: encodedData,
  };

  try {
    // Try to create the secret
    await k8sApi.createNamespacedSecret({namespace,body:secretManifest});
    console.log(`Secret ${secretName} created.`);
  } catch (err) {
    if (err.body && err.body.reason === "AlreadyExists") {
      // If it exists, replace it
      await k8sApi.replaceNamespacedSecret(secretName, namespace, secretManifest);
      console.log(`Secret ${secretName} updated.`);
    } else {
      console.error(err);
      throw err;
    }
  }
}

// Example usage:
const updatedNewKeyObj = {
  key: "updatedNewKeyObj",
  isActive: "y",
  expiresAt: "2026-07-08T00:00:00Z"
};

upsertSecret(namespace, "api-key-secret1", {
  newKey: JSON.stringify(updatedNewKeyObj),
  oldKey: "someOldValue"
});

// console.log(Buffer.from('FINAL_KEY').toString('base64'))
