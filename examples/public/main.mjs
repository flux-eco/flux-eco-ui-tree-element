import {FluxEcoUiTreeElement} from "../../FluxEcoUiTreeElement.mjs";

const state = /** @type {FluxEcoUiTreeElementAttributes} */  {
    rootNode: {
        treeId: "myTreeId",
        parentId: null,
        id: 1,
        status: {
            expanded: true
        },
        data: {
            label: "the root title"
        },
        children: {
            0: {
                treeId: "myTreeId",
                parentId: 1,
                id: 2,
                status: {
                    expanded: true
                },
                data: {
                    label: "a node 2"
                },
                children: {}
            },
            1: {
                treeId: "myTreeId",
                parentId: 1,
                id: 3,
                status: {
                    expanded: true
                },
                data: {
                    label: "a node 3"
                },
                children: {
                    0: {
                        treeId: "myTreeId",
                        parentId: 3,
                        id: 4,
                        status: {
                            expanded: false
                        },
                        data: {
                            label: "a node 4"
                        },
                        children: {
                            0: {
                                treeId: "myTreeId",
                                parentId: 4,
                                id: 5,
                                status: {
                                    expanded: false
                                },
                                data: {
                                    label: "a node 5"
                                },
                            }
                        }
                    }
                }
            },
        },
    },
    nodes: {
        2: {
            treeId: "myTreeId",
            parentId: 1,
            id: 2,
            status: {
                expanded: true
            },
            data: {
                label: "a node 2"
            },
        },
        3: {
            treeId: "myTreeId",
            parentId: 1,
            id: 3,
            status: {
                expanded: true
            },
            children: {
                0: {
                    treeId: "myTreeId",
                    parentId: 3,
                    id: 4,
                    status: {
                        expanded: false
                    },
                    data: {
                        label: "a node 4"
                    },
                    children: {
                        0: {
                            treeId: "myTreeId",
                            parentId: 4,
                            id: 5,
                            status: {
                                expanded: false
                            },
                            data: {
                                label: "a node 5"
                            },
                            children: null
                        }
                    }
                }
            }
        },
        4: {
            treeId: "myTreeId",
            parentId: 3,
            id: 4,
            status: {
                expanded: false
            },
            data: {
                label: "a node 4"
            },
            children: {
                0: {
                    treeId: "myTreeId",
                    parentId: 4,
                    id: 5,
                    status: {
                        expanded: false
                    },
                    data: {
                        label: "a node 5"
                    },
                    children: null
                }
            }
        },
        5: {
            treeId: "myTreeId",
            parentId: 4,
            id: 5,
            status: {
                expanded: false
            },
            data: {
                label: "a node 5"
            },
            children: null
        }
    }

}

const config =  /** @type {FluxEcoUiTreeElementConfig} */  {
    id: "myTreeId",
    settings: {
        nodeDataSchema: {
            label: "string"
        },
    },
    initialState: state
}

const treeElement = FluxEcoUiTreeElement.new(config);
document.body.appendChild(treeElement);