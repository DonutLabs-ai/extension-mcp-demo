import { PageContainer } from '@ant-design/pro-components'
import { WebContainer } from '@webcontainer/api'
import { request } from 'umi'

import { trim } from '@/utils/format'

import Guide from '@/components/Guide'

import { files } from '../../utils/tools/containers-file'
import { startDevServer } from '../../utils/tools/webcontainers'
import styles from './index.less'

// Call only once
window.addEventListener('load', async () => {
  const webcontainerInstance = await WebContainer.boot()
  await webcontainerInstance.mount(files)

  startDevServer(webcontainerInstance)
})

const HomePage: React.FC = () => {
  const name = 'Mcp server'

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
      <div className="container">
        <iframe name="iframeEl"></iframe>
      </div>
    </PageContainer>
  )
}

export default HomePage
