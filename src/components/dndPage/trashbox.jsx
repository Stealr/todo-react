
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';


function trashbox() {
    return (
        <Droppable droppableId="trash">
            {(provided, snapshot) => (
                <div className='trashbox'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                        width: '150px',
                        height: '150px',
                        backgroundColor: snapshot.isDraggingOver ? '#b54e4e' : '#782c2c',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '20px',
                    }}
                >
                    <img src='/src/assets/trash.png' className='image-trash' />

                </div>
            )}
        </Droppable>
    );
}

export default trashbox;