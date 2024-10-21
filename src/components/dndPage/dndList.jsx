// src/components/DndList.jsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DndTask from '/src/components/DndPage/DndTask';


function DndList({ columnId, column, removeTodo }) {
    return (
        <div className="block-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
            <h2 style={{ color: 'white' }}>{column.name}</h2>
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div className='lists'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            padding: 4,
                            width: 200,
                            height: 300,
                        }}
                    >
                        {column.items.map((item, index) => (
                            
                            <DndTask
                                key={item.id}
                                item={item}
                                index={index}
                                removeTodo={() => removeTodo(columnId, item.id)}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default DndList;
