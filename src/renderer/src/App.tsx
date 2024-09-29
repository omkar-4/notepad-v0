import { Content, RootLayout, Sidebar, DraggableTopBar, ActionButton, NotePreviewList } from '@/components'
import { ActionButtonsRow } from './components/ActionButtonsRow'

const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout className=" flex gap-2 pt-8 pr-4 pb-4">
        <Sidebar className="p-2 rounded-md">
          <ActionButtonsRow className='flex justify-between mt-1'/>
          <NotePreviewList className=""/>
        </Sidebar>
        <Content className="pr-2 rounded-lg bg-[#262626]"></Content>
      </RootLayout>
    </>
  )
}

export default App
