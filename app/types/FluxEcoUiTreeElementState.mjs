/**
 * Object representing the state of a map marker
 * @typedef {Object} FluxEcoUiTreeElementState
 * @property {string} id - id of the tree
 * @property {object} nodeDataSchema
 * @property {NodeState} rootNode
 * @property {{string,NodeState}} nodes
 */


/**
 * @typedef NodeState
 * @property {string} treeId - The tree ID object of the node
 * @property {string|null} parentId - The parent ID object of the node - null in case of rootNodeEntity
 * @property {string} id - The id as ID object of the node.
 * @property {NodeStateStatus} status - The status of the node, e.g. whether it is expanded or deleted.
 * @property {null|Object} data - The data of the node, conforming to the schema declared at tree level - null in case of rootNodeEntity
 * @property {{string,NodeState}} children - array of child nodes
 */