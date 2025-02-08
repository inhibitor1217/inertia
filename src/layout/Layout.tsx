import Header from "./Header"
import Main from "./Main"

export interface LayoutProps {
  Header?: React.ReactNode
  children?: React.ReactNode
}

export default function Layout({
  Header: header,
  children,
}: LayoutProps) {
  return (
    <div>
      <Header>
        {header}
      </Header>
      <Main>
        {children}
      </Main>
    </div>
  )
} 