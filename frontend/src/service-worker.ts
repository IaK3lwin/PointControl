/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />


declare let self: ServiceWorkerGlobalScope

import { build, files, version } from '$service-worker'

const CACHE = `cache-${version}`

const ASSETS = [
  ...build,
  ...files
]

//install

self.addEventListener('install', (ev) => {
  async function addFilesToCache() {
    console.log("loading cache")
    const instanceCache = await caches.open(CACHE)
    await instanceCache.addAll(ASSETS)
  }

  ev.waitUntil(addFilesToCache())
})

// active service worker
self.addEventListener('activate', (ev) => {
  async function deleteOldCache() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) {
        await caches.delete(key)
      }
    }
  }

  ev.waitUntil(deleteOldCache())
})

//fetch service worker
self.addEventListener('fetch', (ev) => {
  if (ev.request.method !== 'GET') return

  async function response() {
    const url = new URL(ev.request.url)

    const cacheInstance = await caches.open(CACHE)

    if (ASSETS.includes(url.pathname)) {
      const cacheResponse = await cacheInstance.match(url.pathname)

      if (cacheResponse) {
        return cacheResponse
      }
    }

    // try first network
    try {
      const response = await fetch(ev.request.url)
      const IsNotExtension = url.protocol === 'http:'
      const IsSuccces = response.status == 200

      if (IsNotExtension && IsSuccces) {
        cacheInstance.put(ev.request, response.clone())
      }

      return response
  
    } catch{
      // call back cache response
      const cacheResponse = await cacheInstance.match(url.pathname)
      if (cacheResponse) {
        console.log("achou o cache")
        return cacheResponse
      }

      return new Response("Not found", {status: 404})
  
    }

  }

  ev.respondWith(response())
})