import {
  Content,
  DraggableTopBar,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { ActionButtonsRow } from './components/ActionButtonsRow'
import '@renderer/assets/custom-theme.css'


const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout className=" flex gap-2 pt-8 pr-4 pb-4 min-w-fit">
        <Sidebar className="p-2 rounded-md">
          <ActionButtonsRow className="flex justify-between mt-1 mb-1" />
          <NotePreviewList className="" />
        </Sidebar>
        <Content className="p-4 min-w-fit w-full h-full rounded-lg flex flex-col bg-[#262626] overflow-hidden">
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
