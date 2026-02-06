import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export const TodoList = ({ todos, onReorder }) => {
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        onReorder(items);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => (
                            <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="todo-item"
                                    >
                                        {/* محتوى الـTodo */}
                                        <span>{todo.title}</span>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};