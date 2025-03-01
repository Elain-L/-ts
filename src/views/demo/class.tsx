import { PureComponent, ReactNode } from "react"

interface Iprops {
  name: string
  heught?: number
}
interface IState {
  name: string
  height?: number
}
class DEmo1 extends PureComponent<Iprops, IState> {
  name = "aaaa"
  state = {
    name: "123",
    height: 123
  }

  render(): ReactNode {
    return <div>class</div>
  }
}

export { DEmo1 }
