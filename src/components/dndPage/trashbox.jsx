
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';


function trashbox( column ) {
    return (
        <Droppable droppableId="trash">
            {(provided, snapshot) => (
                <div className='trashbox'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                        width: '150px',
                        height: '150px',
                        backgroundColor: snapshot.isDraggingOver ? 'red' : 'darkred',
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