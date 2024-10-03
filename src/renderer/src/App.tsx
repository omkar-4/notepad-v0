import {
  Content,
  DraggableTopBar,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import '@renderer/assets/custom-theme.css'
import { ActionButtonsRow } from './components/ActionButtonsRow'

const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout className=" flex gap-2 pt-8 pr-4 pb-4 min-w-fit">
        <Sidebar className="absolute hidden sm:block sm:static p-2 rounded-md">
          <ActionButtonsRow className="flex justify-between mt-1 mb-1" />
          <NotePreviewList className="" />
        </Sidebar>
        <Content className="ml-4 sm:ml-0 p-4 min-w-fit w-full h-full rounded-lg flex flex-col bg-[#262626] overflow-hidden">
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
