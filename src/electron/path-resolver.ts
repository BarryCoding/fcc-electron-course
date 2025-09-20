import path from 'path'
import { app } from 'electron'
import { IS_DEV } from './util.js'

/**
 * Returns the absolute path to the Electron preload script.
 *
 * - In development (IS_DEV === true), the path is resolved relative to the app's root directory,
 *   so we join app.getAppPath(), '.', and '/dist-electron/preload.cjs'.
 *   This results in: <project-root>/dist-electron/preload.cjs
 *
 * - In production (IS_DEV === false), the app is packaged and the app path points to the 'dist' directory,
 *   so we need to go up one level ('..') to reach the root, then into 'dist-electron/preload.cjs'.
 *   This results in: <parent-of-dist>/dist-electron/preload.cjs
 */
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    IS_DEV ? '.' : '..', // Use '.' in dev, '..' in prod to get correct base directory
    '/dist-electron/preload.cjs'
  )
}
