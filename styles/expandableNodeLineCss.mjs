export const expandableNodeLineCss = `
    @font-face {
        font-family: 'il-icons';
        src: url('flux-eco-ui/libs/flux-eco-ui-tree-element/styles/fonts/il-icons.woff') format('woff'), url('flux-eco-ui/libs/flux-eco-ui-tree-element/styles/fonts/il-icons.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
    }
    :host {
        font-size: 14px;
        font-family: 'Open Sans', Verdana, Arial, Helvetica, sans-serif;
        line-height: 1.42857143;
        color: #161616;
    }
    flux-eco-ui-tree {
        padding: 0 4px 0 calc(4px + 4px);
        margin-left: 0px;
    }
    ul {
      list-style-type: none;
      padding-left: 14px;
    }
    .nodeLine {
        padding: 3px 0 3px 14px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
    }
    .nodeLabel {
        padding-left: 4px;
    }
    .collapsed:before {
        font-family: 'il-icons';
        content: '\\e606';
        color: #737373;
        position: absolute;
        margin-left: -20px;
    }
    .expanded:before {
        font-family: il-icons;
        content: "\\e604";
        color: #737373;
        position: absolute;
        margin-left: -20px;
    }
`