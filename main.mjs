import grapesjs from 'grapesjs'

/**
 * @param {import("grapesjs").Editor} editor
 */
function example(editor) {
  editor.Components.addType('example-inner', {
    model: {
      toHTML() {
        return `<example-inner>${this.getInnerHTML()}</example-inner>`
      },
    },
  })

  editor.Components.addType('example-outer', {
    model: {
      toHTML() {
        return `<example-outer>${this.getInnerHTML()}</example-outer>`
      },
    },
  })

  editor.Blocks.add('example', {
    label: 'Example',
    activate: true,
    content: {
      type: 'example-outer',
      components: [
        { type: 'example-inner', components: 'Hello, world!' }
      ]
    },
  })
}

/**
 * @param {import("grapesjs").Editor} editor
 */
function openBlocksByDefault(editor) {
  editor.on('load', () => {
    editor.Panels.getButton('views', 'open-blocks').set('active', true)
  })
}

/**
 * @param {import("grapesjs").Editor} editor
 */
function showProjectData(editor) {
  // console.log(editor.Panels.getPanels().map(panel => panel.id))
  editor.Panels.addButton('options', {
    label: '!',
    command: () => {
      editor.Modal.open({
        title: 'Project data',
        content: `
          <pre style="max-height: 50vh; overflow: auto; color: #eee;">${
            JSON.stringify(editor.getProjectData(), null, 2)
          }</pre>
        `,
      })
    }
  })
}

grapesjs.init({
  container: '#gjs',
  height: '100vh',
  storageManager: false,
  plugins: [
    example,
    openBlocksByDefault,
    showProjectData
  ],
})
