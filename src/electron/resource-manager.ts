import osUtils from 'os-utils'
import fs from 'fs'
import os from 'os'

// Interval (in ms) for polling system resources
const POLLING_INTERVAL = 500

/**
 * Periodically polls and logs CPU, RAM, and storage usage.
 */
export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage() // Get current CPU usage (0-1)
    const ramUsage = getRamUsage() // Get current RAM usage (0-1)
    const storageData = getStorageData() // Get storage usage and total
    console.log({ cpuUsage, ramUsage, storageUsage: storageData.usage })
  }, POLLING_INTERVAL)
}

/**
 * Returns static system data: total storage (GB), CPU model, and total memory (GB).
 */
export function getStaticData() {
  const totalStorage = getStorageData().total // Total storage in GB
  const cpuModel = os.cpus()[0].model // CPU model string
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024) // Total memory in GB

  console.log(
    `🤖 ~ system data:, totalStorage: ${totalStorage}, cpuModel: ${cpuModel}, totalMemory: ${totalMemoryGB}GB`
  )
  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  }
}

/**
 * Returns a Promise that resolves to the current CPU usage (0-1).
 */
function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve)
  })
}

/**
 * Returns the current RAM usage as a fraction (0-1).
 */
function getRamUsage() {
  return 1 - osUtils.freememPercentage()
}

/**
 * Returns storage data: total storage (GB) and usage (0-1).
 */
function getStorageData() {
  // Get filesystem stats for root directory
  const stats = fs.statfsSync('/')
  const total = stats.bsize * stats.blocks // Total bytes
  const free = stats.bsize * stats.bfree // Free bytes

  return {
    total: Math.floor(total / 1_000_000_000), // Convert bytes to GB
    usage: 1 - free / total, // Used storage as a fraction (0-1)
  }
}
