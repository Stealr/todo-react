// src/components/DndTask.jsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


function DndTask({ item, index, removeTodo }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: 'none',
                        padding: 16,
                        margin: '0 0 8px 0',
                        minHeight: '50px',
                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                        color: 'white',
                        ...provided.draggableProps.style,
                        ...snapshot.isDragging,
                    }}
                >
                    {item.content}
                    <button>del</button>
                </div>
            )}
        </Draggable>
    );
}

export default DndTask;
