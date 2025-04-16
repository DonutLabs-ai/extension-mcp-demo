import { WebContainer } from '@webcontainer/api'

export async function startDevServer(webcontainerInstance: WebContainer) {
  const installProcess = await webcontainerInstance.spawn('npm', ['install'])

  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    throw new Error('Unable to run npm install')
  }

  // `npm run dev`
  await webcontainerInstance.spawn('npm', ['run', 'start'])

  const iframeEl = document.querySelector('iframe')
  if (!iframeEl) {
    console.log('no iframe')
  } else {
    webcontainerInstance.on('server-ready', (_port, url) => {
      iframeEl.src = url
    })
  }
}
