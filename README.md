# FluxUiTreeElement

# Typedefs

## Id

``` js
/**
 * @typedef {Id}
 * @property {string} value
 * @property {string} path
 */
```

## TreeState

``` js
/**
 * @typedef TreeState
 * @property {Id} id - id of the tree
 * @property {object} nodeDataSchema
 * @property {NodeState} rootNode
 * @property {NodeState[]} nodes
*/
```

## NodeState

``` js
/**
 * @typedef NodeState
 * @property {Id} treeId - The tree ID object of the node
 * @property {null|Id} parentId - The parent ID object of the node - null in case of rootNodeEntity
 * @property {Id} id - The id as ID object of the node.
 * @property {NodeStateStatus} status - The status of the node, e.g. whether it is expanded or deleted.
 * @property {null|Object} data - The data of the node, conforming to the schema declared at tree level - null in case of rootNodeEntity
 * @property {NodeState[]} children - array of child nodes
*/
```

## Usage

``` js
const treeElementApi = await FluxUiTreeElementApi.new((nodeState) => {
    // onClicked event handler function
    console.log(`Node clicked with ID ${nodeState.id.value}`);
});

const parentElement = document.getElementById('my-tree-container');
const treeState = {
  id: { value: 'my-tree', path: 'flux-eco-ui-tree-state/my-tree' },
  nodeDataSchema: { type: 'object', properties: { label: { type: 'string' } } },
  rootNode: { treeId: { value: 'my-tree', path: 'flux-eco-ui-tree-state/my-tree' }, id: { value: 'rootNode', path: '/rootNode' }, data: null, children: [(...)], status: { expanded: true } },
  nodes: [
    { treeId: { value: my-tree, path: flux-eco-ui-tree-state/my-tree }, parentId: null, id: { value: "my-first-node", path: /nodes/my-first-node },status: {expanded: true, deleted: false }, data: { label: My First Node } (...)},
    { (...) }
  ]
};
treeElementApi.render(parentElement, treeState);

``` 

## HTML
The FluxUiTreeElement renders the tree data into an HTML element with the following structure:
``` html
 <flux-ui-tree id="flux-eco-ui-tree-state/my-tree">
  #shadow-root (closed)
    <ul>
      <li>
       <span>
        <span>My First Node</span>
       </span>
      <ul>
       <li>
        <span>
         <span>A child node</span>
        </span>
       </li>
      </ul>
     </li>
    </ul>
 </flux-ui-tree>
``` 