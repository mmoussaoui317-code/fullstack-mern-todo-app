import { useRef, useState } from "react";


export const SimpleDragDrop = ({items, onReorder}) => {
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const dragItem = useRef(null);
    const handleDragStart = (e, index) => {
        dragItem.current = index;
        setDraggingIndex(index);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);    
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        if(dragItem.current !== null && dragItem.current !== index) {
            const newItems = [...items];
            const draggedItem = newItems[dragItem.current];
            newItems.splice(dragItem.current, 1);
            newItems.splice(index, 0, draggedItem);
            onReorder(newItems);

        }

            setDraggingIndex(null);
            setDragOverIndex(null);
            dragItem.current = null;
    }

    const handleDragEnd = () => {
        setDraggingIndex(null);
        setDragOverIndex(null);
        dragItem.current = null;
    }

    return (
        <div className={"simple-drag-drop-container"}>
            {/* <h1>Simple Drag and Drop</h1> */}
            <div className={"simple-drag-drop-item"} >
                {   
                    items.length > 0 && items.map((item, index) => (
                        <div key={item.id || index} 
                            draggable
                            onDragStart={(e) => handleDragStart(e, index) }
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`drag-item ${ draggingIndex === index ? 'dragging' : "" } ${ dragOverIndex === index ? "drag-over" : ""}`}
                            style={{    opacity: draggingIndex === index ? 0.5 : 1,
                                        backgroundColor: dragOverIndex === index ? "#e3f2fd" : "white",
                                        border: "1px solid #e3f2fd",
                                        padding: "10px",
                                        margin: "5px 0px",
                                        borderRadius: "5px",
                                        cursor: "grab",
                                        transition: "all 0.2s ease-in-out",
                            }}
                        >
                            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                <span style={{cursor: "grab"}}>=</span>
                                <span >
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};


// const styles = `
//     .simple-drag-container {
//         width: 100%;
//     }

//     .drag-item {
//         user-select: none;
//     }

//     .drag-item.dragging {
//         opacity: 0.5;
//         transform: scale(0.98);
//     }

//     .drag-item.drag-over {
//         border: 2px dashed #2196f3 !important;
//         background-color: #e3f2fd !important;
//     }
// `;