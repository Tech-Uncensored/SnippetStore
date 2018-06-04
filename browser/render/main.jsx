import React from 'react'
import SideBar from './components/side-bar'
import SnippetList from './components/snippet-list'
import ModalList from './modals/modal-list'
import SnippetStore from 'store/SnippetStore'
import CM from 'lib/config-manager'
import eventEmitter from 'lib/event-emitter'
import init from 'core/init'

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      config: CM.get()
    }
  }

  componentDidMount () {
    document.body.setAttribute('data-theme', this.state.config.ui.theme)
    init()
    eventEmitter.on('config:set', (event, config) => {
      this.setState({ config })
    })
  }

  render () {
    return (
      <div className='wrapper'>
        <ModalList store={SnippetStore} config={this.state.config} />
        <SideBar />
        <SnippetList store={SnippetStore} config={this.state.config} />
      </div>
    )
  }
}
