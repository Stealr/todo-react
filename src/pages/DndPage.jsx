// src/pages/DndPage.jsx
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DndList from '/src/components/DndPage/DndList';
import TrashBox from '/src/components/DndPage/trashbox.jsx';

function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        Done: {
            name: 'Done',
            items: [],
        },
        Blocked: {
            name: 'Blocked',
            items: [],
        },
    });

    const [newTodo, setNewTodo] = useState('');

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo) return;

        const newTodoItem = {
            id: `${Date.now()}`,
            content: newTodo,
        };


        setColumns((prevColumns) => ({
            ...prevColumns,
            todo: {
                ...prevColumns.todo,
                items: [...prevColumns.todo.items, newTodoItem],
            },
        }));

        setNewTodo('');

    }

    const removeTodo = (columnId, taskId) => {
        setColumns((prevColumns) => {
            const column = prevColumns[columnId];
            const updatedItems = column.items.filter((item) => item.id !== taskId);
    
            return {
                ...prevColumns,
                [columnId]: {
                    ...column,
                    items: updatedItems,
                },
            };
        });
    };


    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === 'trash') {
            const sourceColumn = columns[source.droppableId];
            const sourceItems = [...sourceColumn.items];

            // const taskElement = document.querySelector(`[data-rbd-drag-handle-draggable-id='${result.draggableId}']`);
            // taskElement.classList.add('del-animation');

            sourceItems.splice(source.index, 1);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        } else {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    return (
        <div className='dndPage' style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                <div className='left-tools'>
                    <h2> Dnd Todo </h2>
                    <a href='/'>Переход на Simple todo</a>
                    <form className="dnd-form" onSubmit={addTodo}>
                        <input className='input-dnd'
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Add new task..."
                        />
                        <button className="add-dnd-button" type="submit">Add</button>
                    </form>

                    <div className='trash'>
                        <TrashBox column={columns} />
                    </div>
                </div>

                <div className='right-col'>
                    {Object.entries(columns).map(([columnId, column]) => {
                        return (
                            <DndList key={columnId} columnId={columnId} column={column} removeTodo={removeTodo} />
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}

export default DndPage;
