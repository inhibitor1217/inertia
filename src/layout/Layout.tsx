import Header from "./Header"
import Main from "./Main"
import Nav from "./Nav"

export interface LayoutProps {
  Header?: React.ReactNode
  Nav?: React.ReactNode
  Overlay?: React.ReactNode
  children?: React.ReactNode
}

export default function Layout({
  Header: header,
  Nav: nav,
  Overlay,
  children,
}: LayoutProps) {
  return (
    <div>
      <Header>
        {header}
      </Header>
      <Main Overlay={Overlay}>
        {children}
      </Main>
      <Nav>
        {nav}
      </Nav>
    </div>
  )
} 